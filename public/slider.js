/* ================================================================
   WeFitNest — 3D Cylinder Carousel Controller
   ----------------------------------------------------------------
   Items are pre-positioned in a circle via CSS:
     transform: rotateY(itemAngle deg) translateZ(radius)
   This script rotates the .slider-track around the Y-axis, which
   spins the whole cylinder. No translateX overflow, no page jump.

   Modes
   ─────
   auto  — constant angular velocity (eases in/out on hover)
   snap  — lerps to a specific target angle, then returns to auto
   ================================================================ */
(() => {
	const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

	// ── Config ────────────────────────────────────────────────────────
	/** Degrees per rAF frame (~60 fps) when auto-rotating. */
	const AUTO_SPEED = prefersReducedMotion ? 0 : 0.065;

	/** How quickly `speed` eases toward `targetSpeed` (0–1). */
	const EASE_K = 0.055;

	/** How quickly the angle lerps toward `targetAngle` in snap mode. */
	const SNAP_EASE_K = 0.12;

	/** Threshold in degrees at which snap is considered complete. */
	const SNAP_DONE = 0.08;

	/** Degrees rotated per pixel of touch drag. */
	const TOUCH_SENS = 0.38;

	/** ms to wait after an interaction before resuming auto-rotation. */
	const RESUME_DELAY_MS = 2200;

	// ── Init all carousels on the page ────────────────────────────────
	const stages = Array.from(document.querySelectorAll('[data-carousel]'));
	if (!stages.length) {
		return;
	}

	stages.forEach((stage) => {
		const track = stage.querySelector('.slider-track');
		const items = Array.from(stage.querySelectorAll('.slider-item'));
		const dots = Array.from(stage.querySelectorAll('.carousel-dot'));
		const prevBtn = stage.querySelector('.carousel-prev');
		const nextBtn = stage.querySelector('.carousel-next');

		if (!track || !items.length) {
			return;
		}

		const n = items.length;
		const STEP = 360 / n; // degrees between adjacent items

		let angle = 0; // current track rotateY angle
		let targetAngle = 0; // used in snap mode
		let speed = AUTO_SPEED;
		let targetSpeed = AUTO_SPEED;
		/** @type {'auto'|'snap'} */
		let mode = prefersReducedMotion ? 'snap' : 'auto';
		let isHovering = false;
		let isTouching = false;
		let touchLastX = 0;
		let resumeTimer = null;

		// ── Helpers ───────────────────────────────────────────────────

		/** Index of the item currently facing the viewer. */
		const activeIndex = () => {
			const norm = ((-angle % 360) + 360) % 360;
			return Math.round(norm / STEP) % n;
		};

		/**
		 * Target angle to show item `i` at front, taking the shortest
		 * path from the current `angle` (avoids spinning the wrong way).
		 */
		const angleFor = (i) => {
			const base = -(i * STEP);
			const k = Math.round((angle - base) / 360);
			return base + k * 360;
		};

		const syncUI = () => {
			const ai = activeIndex();
			dots.forEach((d, i) => d.setAttribute('aria-selected', i === ai ? 'true' : 'false'));
			items.forEach((item, i) =>
				item.setAttribute('aria-hidden', i !== ai ? 'true' : 'false')
			);
		};

		// ── rAF loop ──────────────────────────────────────────────────
		const step = () => {
			if (mode === 'auto') {
				speed += (targetSpeed - speed) * EASE_K;
				angle -= speed; // negative → items advance left to right
				track.style.transform = `rotateY(${angle}deg)`;
			} else {
				// snap mode: lerp toward targetAngle along the shortest arc
				const diff = targetAngle - angle;
				const d = ((diff + 180) % 360 + 360) % 360 - 180; // normalize to [-180, 180]
				angle += d * SNAP_EASE_K;
				track.style.transform = `rotateY(${angle}deg)`;

				if (Math.abs(d) < SNAP_DONE) {
					angle = targetAngle;
					track.style.transform = `rotateY(${angle}deg)`;
					if (!isHovering && !isTouching && !prefersReducedMotion) {
						// Resume timer will switch mode back to auto
					}
				}
			}

			syncUI();
			requestAnimationFrame(step);
		};

		requestAnimationFrame(step);

		// ── Snap to a specific item index ─────────────────────────────
		const snapTo = (i) => {
			mode = 'snap';
			targetAngle = angleFor(i);
			speed = 0;
			clearTimeout(resumeTimer);
			if (!prefersReducedMotion) {
				resumeTimer = setTimeout(() => {
					if (!isHovering && !isTouching) {
						mode = 'auto';
						targetSpeed = AUTO_SPEED;
					}
				}, RESUME_DELAY_MS);
			}
		};

		const resumeAuto = () => {
			if (!prefersReducedMotion) {
				clearTimeout(resumeTimer);
				resumeTimer = setTimeout(() => {
					if (!isHovering && !isTouching) {
						mode = 'auto';
						targetSpeed = AUTO_SPEED;
					}
				}, 400);
			}
		};

		// ── Hover: slow down on enter, resume on leave ────────────────
		stage.addEventListener('mouseenter', () => {
			isHovering = true;
			targetSpeed = 0;
		});

		stage.addEventListener('mouseleave', () => {
			isHovering = false;
			if (!isTouching) {
				resumeAuto();
			}
		});

		// ── Arrow buttons ─────────────────────────────────────────────
		if (prevBtn) {
			prevBtn.addEventListener('click', () => snapTo((activeIndex() - 1 + n) % n));
		}
		if (nextBtn) {
			nextBtn.addEventListener('click', () => snapTo((activeIndex() + 1) % n));
		}

		// ── Dot nav ───────────────────────────────────────────────────
		dots.forEach((dot) => {
			dot.addEventListener('click', () => {
				const idx = Number(dot.getAttribute('data-dot-index'));
				if (!Number.isNaN(idx)) {
					snapTo(idx);
				}
			});
		});

		// ── Keyboard ──────────────────────────────────────────────────
		stage.setAttribute('tabindex', '0');
		stage.addEventListener('keydown', (e) => {
			if (e.key === 'ArrowLeft') {
				snapTo((activeIndex() - 1 + n) % n);
			} else if (e.key === 'ArrowRight') {
				snapTo((activeIndex() + 1) % n);
			}
		});

		// ── Touch drag ────────────────────────────────────────────────
		stage.addEventListener(
			'touchstart',
			(e) => {
				if (!e.touches.length) {
					return;
				}
				isTouching = true;
				touchLastX = e.touches[0].clientX;
				mode = 'snap';
				targetAngle = angle;
				targetSpeed = 0;
				speed = 0;
				clearTimeout(resumeTimer);
			},
			{ passive: true }
		);

		stage.addEventListener(
			'touchmove',
			(e) => {
				if (!isTouching || !e.touches.length) {
					return;
				}
				const x = e.touches[0].clientX;
				const delta = x - touchLastX;
				touchLastX = x;
				angle += delta * TOUCH_SENS;
				targetAngle = angle;
				track.style.transform = `rotateY(${angle}deg)`;
				syncUI();
			},
			{ passive: true }
		);

		const onTouchEnd = () => {
			if (!isTouching) {
				return;
			}
			isTouching = false;
			snapTo(activeIndex());
		};

		stage.addEventListener('touchend', onTouchEnd, { passive: true });
		stage.addEventListener('touchcancel', onTouchEnd, { passive: true });
	});
})();
