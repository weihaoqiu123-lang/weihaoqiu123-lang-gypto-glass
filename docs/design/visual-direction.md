# Gypto-Glass Design Flow

## Goal
Build a crypto-native eyewear storefront that feels like a premium eyewear brand first and a crypto mechanism second.

## Visual Thesis
MOSCOT-level product confidence with Crypto market atmosphere held in the background, not in the driver's seat.

In plain language:
- the site should feel like a real brand selling desirable frames
- the product image must be the hero
- the chart should support the story, not dominate the page
- the first impression should be editorial and premium, not like a trading dashboard

## Reference Reading

### What to borrow from MOSCOT
- strong product-first confidence
- low copy density
- sharper use of whitespace
- brand attitude without UI clutter
- product photography or product silhouette doing most of the emotional work

### What to borrow from GlassesUSA
- faster product entry
- clearer shopping pathways
- easier scanning of styles, colors, and price
- more direct commerce affordances

### What not to copy from either
- generic sale-heavy e-commerce clutter
- too many promos, labels, and utility rows at once
- weak product visuals hidden under explanation blocks

## Core Design Rules

1. Product first
- every hero should answer: what am I buying?
- the frame image or silhouette must dominate the top half of the page

2. Chart second
- chart exists to explain dynamic pricing credibility
- chart cannot visually outweigh the product

3. Mechanic third
- fixed buy, dynamic buy, and 1x/2x/3x should come after product attraction
- users should want the frame before learning the mechanic

4. Fewer cards
- reduce dashboard feeling
- use bigger planes and clearer section hierarchy

5. One visual idea per section
- hero: product desire
- support: why this drop matters
- detail: pricing mechanic
- conversion: buy now

## Recommended Layout Direction

### Homepage
- first screen: one hero product, one line of promise, one clear CTA
- second screen: product row with 3 launch frames
- third screen: dynamic pricing explanation
- fourth screen: fulfillment / trust / payment rail

### Product Detail Page
- first screen: dominant product image, compact market panel, buy box
- second screen: product detail, color options, highlights
- third screen: dynamic pricing explanation and weekly UTC settlement logic

## Product + Chart Integration

### Recommended default
Use product-dominant split, not equal split.

Meaning:
- 65-75% of the first visual weight should belong to the product
- 25-35% should belong to market context

### Best production direction
Product visual plus compact chart panel.

This means:
- the product image is large and emotionally strong
- the chart sits to the side or lower-right as a precision panel
- users feel both "this is a real product" and "this has a live market mechanic"

### Not recommended as default
Full equal split.

Why:
- too much screen weight goes to data
- it weakens the shopping instinct
- it makes the page feel more like a crypto tool than a fashion commerce page

## Product Page Visual Modes

### Mode A: Product Dominant
Best for production default.

Use when:
- user lands from homepage or ads
- we want strongest purchase intent

Composition:
- large product image
- smaller chart module beside or below
- short supporting text only

### Mode B: Chart Focus
Good as optional switch.

Use when:
- user specifically wants to inspect the pricing mechanic
- user is already convinced by the product

Composition:
- chart expands
- product image remains visible but secondary

### Mode C: Split
Good for demo and internal review.

Use when:
- explaining the concept to partners or investors
- showing the hybrid nature of the product

Not ideal as the permanent default commerce view.

## Typography Direction
- brand/product names should feel editorial, not app-like
- short, dense headings
- supporting copy should be one sentence whenever possible
- avoid too much uppercase utility text on primary brand surfaces

## Color Direction
- keep black, warm metallic, bone white, and cool mint as the primary visual system
- use chart colors as accent, not base identity
- BTC page can lean warm gold
- SOL page can lean cool mint/ice
- ETH page can lean silver/smoke

## Motion Direction
- subtle image reveal on product hero
- soft chart line fade or draw-in
- view toggle should feel clean and mechanical
- avoid floating finance-dashboard animations

## Immediate Design Tasks
1. Redesign BTC product page hero into product-dominant mode
2. Reduce card density on the product page
3. Make chart feel like an accessory panel, not a competing screen
4. Add stronger product image hierarchy before purchase panel
