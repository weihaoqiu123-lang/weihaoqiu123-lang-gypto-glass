# BTC Product Page Redesign

## Objective
Turn the BTC product page from a concept-heavy hybrid layout into a product-first luxury commerce page with a crypto-native support layer.

Current page problem:
- product and chart are competing for attention
- too much of the page feels like a prototype
- the frame still does not feel premium enough

## Visual Thesis
The BTC page should feel like a premium launch poster with a market intelligence panel attached to it.

## Recommended Default Structure

### Section 1: Hero
Three-column logic on desktop:
- left: compact product story and CTA
- center: dominant frame visual
- right: compact market panel + buy box

On mobile:
- product title
- product visual
- price / mode / buy box
- chart below

### Section 2: Product depth
- colors
- material or style cues
- highlights

### Section 3: Dynamic pricing explanation
- weekly UTC settlement
- deposit tier explanation
- one chart block

### Section 4: Fulfillment / trust
- Solana USDC
- weekly settlement
- 24h final payment window
- shipping promise

## Hero Composition Recommendation

### Best direction
Use one large BTC frame visual in the center, with a warm gold market signal accent.

The chart should not be side-by-side at the same scale.
Instead:
- chart becomes a compact right rail module
- product image remains 2x to 3x more visually dominant than the chart

### Why this is better
- reads like product commerce first
- keeps crypto differentiation
- avoids the "bloated split-screen" problem

## Recommended Information Priority
1. Product name
2. Product image
3. Hero headline
4. Purchase panel
5. Current BTC market panel
6. Dynamic pricing explanation

## Specific UI Changes To Make
1. Replace equal-weight visual switch default with product-dominant hero
2. Keep `Product / Chart / Split` as optional view toggles for exploration
3. Move chart into a smaller precision module when in default mode
4. Make the buy panel feel cleaner and more commerce-like
5. Reduce utility labels and over-explaining text in the hero region

## Notes For Implementation
- default hero mode should be product-dominant
- chart should still load live BTC data
- view switch should remain available for power users
- buy panel should remain visible without pushing product below the fold
