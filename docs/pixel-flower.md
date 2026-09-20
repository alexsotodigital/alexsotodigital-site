# Pixel Flower Asset

- Asset: `src/assets/pixel-flower.png`
- Generated with the built-in image generation tool on September 17, 2026.
- Bundled locally as a 256 x 256 transparent PNG (approximately 46 KB).
- Used only on stepped section dividers and page endings, not in headers or the hero.
- Companion assets: `src/assets/pixel-daisy.png` and `src/assets/pixel-bellflower.png`, generated with the built-in image tool using the original flower as a style reference.
- The flowers now form a wild-garden divider with `src/assets/pixel-fern.png`, small CSS shoots and a thin stepped ground line.
- Each separator has a distinct, deterministic arrangement seeded by its page and position, stable across builds. Eight clusters each contain two flowers and foliage or a shoot; narrow containers display six or five clusters to prevent crowding.
- Three flower shapes combine with coral and teal CSS color variants. Flowers render at 18-32 CSS pixels and 40% opacity; ferns at 12-20 pixels and 28%; shoots and ground at 30%. All are static, decorative and non-interactive.
- Original local SVG sprites (`pixel-bee.svg` and `pixel-dragonfly.svg`) appear occasionally above internal dividers, not in the hero or footer. They render at 24 x 16 pixels and 40% opacity, without animation or external requests. Native SVG was approved after the image generation quota was reached; no credentials or paid generation path were used.

## Fern Generation Prompt

Generated with the built-in image tool, using `pixel-flower.png` as a style reference; saved as `src/assets/pixel-fern.png` (256 x 256 transparent PNG).

Use case: stylized-concept. Make a single original pixel-art sprite of a little wild leafy plant, a fern-like rosette with 5 asymmetric narrow green leaves and two very small shoots. True alpha transparent background. Match the provided flower STYLE REFERENCE: consistent chunky square pixels, selective dark teal outline, simple stacked shading, no smooth gradients. This is foliage only, no flowers, no pot, no ground, no text, no other objects. Low broad silhouette, root at bottom center, entire plant visible with tight safe margins. Limited sage green and muted teal palette with restrained light green highlights. It must read clearly at 18-24px high, calm solarpunk garden rather than realistic botanical drawing. Square canvas.
- Empty alternative text and `aria-hidden` keep decoration out of the reading order.
- User-supplied visual reference: https://static.vecteezy.com/system/resources/previews/069/526/910/non_2x/colorful-pixel-art-flowers-collection-vector.jpg
- The reference is inspiration, not a distributed asset or a claim of exclusive ownership of the generated illustration.

## Generation Prompt

### Daisy Companion

Use case: stylized-concept. Create ONE original transparent pixel-art flower sprite for a quiet regenerative garden on a professional website. Input image is a STYLE REFERENCE ONLY, not the subject to copy. Match its consistent chunky square pixels, restrained voxel shading and dark charcoal outline, but make a DIFFERENT species: an ivory-white eight-petal daisy with a small amber center, slender teal-green straight stem and two narrow asymmetric leaves. Front-facing, fully visible, square canvas, true alpha background. No ground, pot, text, scene or other flowers. Keep stem base at 96 percent canvas height so it can meet a CSS ground line; tight margins, bloom centered. Modest leaf silhouette, no exaggerated gloss, gradients or tiny texture. Readable when displayed at 36 pixels. A harmonious companion to the magenta flower, not a recolor of it.

### Bellflower Companion

Use case: stylized-concept. Create ONE original transparent pixel-art flower sprite for a quiet regenerative garden on a professional website. Input image is a STYLE REFERENCE ONLY, not the subject to copy. Match its chunky square pixels, restrained voxel shading and dark charcoal outline, but make a DIFFERENT species: a small blue/teal bellflower with three pointed joined petals forming a cup, subtle pale cyan highlights, one slightly curved green stem and two long narrow green leaves. Silhouette clearly different from the reference's round magenta five-petal flower and from a daisy. Front-facing, fully visible, square canvas, true alpha background. No ground, pot, text, scene or other flowers. Stem base at 96 percent canvas height so it can meet a CSS ground line; tight margins. No gloss, smooth gradients or tiny texture. Readable when displayed at 36 pixels. Muted blue petals with green leaves, calm harmonious companion for a diverse pixel garden.

### Original Flower

Create a single original pixel-art flower sprite for a solarpunk professional website. Use case: stylized-concept. Reference image is inspiration ONLY for clear chunky square-pixel silhouettes, not an edit target and not to be copied. ONE standing flower, centered and fully visible, one stem and two leaves. Rich magenta/pink block petals with subtle stacked voxel depth, small golden-yellow center, teal and fresh green leaves, dark charcoal selectively shaded edges. 3/4 slight isometric depth but front-facing readable silhouette, crisp block geometry, no smooth gradients, no blurred pixels, no tiny texture. Limited palette. Square transparent PNG background with real alpha (not a checkerboard or white background). Flower fills 85% of canvas with tight safe margins. No soil, pot, scene, text, signature, watermark, frame, UI, multiple flowers or sprite sheet. Image should be recognizable when reduced to 48 px, friendly and restrained rather than realistic. Use a small native pixel grid upscale look with consistent pixel size.
