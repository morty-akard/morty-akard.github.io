# Making a complex research setup easier to understand

## Redesigning BetaTrends’ multi-step “New Interaction” flow

At BetaTrends, businesses created an “Interaction” to show content to a target audience, ask questions, and collect market feedback. The setup flow had to hold content, questions, eligibility rules, demographics, pricing, preview, and payment—but creators could not always tell where they were, what remained, or how their choices would appear.

I helped turn that long, fragmented setup into a staged experience with visible progress, a persistent preview, clearer question management, and more explicit incomplete states. I took the work from journey mapping and behavioural review through design options, prototype testing, iteration, and developer handoff.

![The redesigned New Interaction workspace combines numbered creation steps, a live preview, and a visible price estimate.](images/01-hero-new-interaction.png)

*The redesigned workspace kept the creator’s steps, audience-facing preview, and cost context visible together. This is design evidence; production release and post-launch impact have not been verified.*

<video controls muted playsinline preload="metadata" width="100%">
  <source src="images/02-full-prototype.mp4" type="video/mp4">
  <a href="images/02-full-prototype.mp4">Watch the complete New Interaction prototype walkthrough</a>.
</video>

*A complete walkthrough of the prototype shows how the stages, preview, navigation, and interaction states work together. The clip is evidence of the designed experience, not proof of production release.*

| | |
|---|---|
| **Role** | Product Designer |
| **Company** | BetaTrends, a real-time market-research platform |
| **Period** | June 2023–September 2024 (overall BetaTrends role; exact feature dates not recovered) |
| **Collaboration** | Primarily with Pieter, founder and product owner, who also worked in engineering |
| **My contribution** | Journey mapping, initial flow improvement, Hotjar review, three redesign options, workshop facilitation, interactive prototype, Maze usability testing, iteration, and developer handoff |
| **Status** | Design and handoff completed; implementation and production impact are not confirmed |

## The real problem was not one form—it was the whole journey

Creating an Interaction meant moving through an eight-step journey: finding the entry point, entering research content, understanding costs, previewing the audience experience, paying, and publishing. The existing journey map documented several sources of friction: a long form, repeated modals, unclear cost calculation, and difficulty finding the preview.

<video controls muted playsinline preload="metadata" width="100%">
  <source src="images/03-audience-interaction.mov" type="video/quicktime">
  <a href="images/03-audience-interaction.mov">Watch how an audience member responds to an Interaction</a>.
</video>

*This audience-side prototype gives the creator’s setup task a concrete purpose: the content and choices configured in the flow become the research experience another person sees.*

I contributed to mapping this journey from the information and assumptions available to the team. The map helped us stop treating each screen as an isolated UI problem. It showed that creators needed stronger orientation across the entire task.

![An eight-step journey map showing friction around finding the entry point, completing a long form, understanding costs, locating preview, and moving through modals.](images/02-creator-journey-map.jpg)

*The journey map connected scattered interface problems into one creation experience. Its inputs included existing information and assumptions, so it should not be read as primary-research evidence.*

![Animation of the inherited long-form creation experience.](images/05-old-long-form.gif)

*The inherited experience concentrated many inputs into a long page, making the amount of work difficult to judge at a glance.*

![Animation of the inherited modal-based preview and cost sequence.](images/06-old-modal-flow.gif)

*Preview and cost information sat behind separate modal interactions, interrupting the creator’s sense of continuity.*

## Behavioural recordings made the friction harder to dismiss

I recommended using a behavioural-insights tool and reviewed Hotjar recordings of the `/newTrend` route. The recovered screenshots confirm that recordings existed for people entering and leaving through this route, with sessions lasting several minutes. They do not preserve the full analysis method, sample, or dates well enough to support the old numerical outcome claim.

The recordings nonetheless gave the team a more concrete basis for iteration than assumptions alone. Together with the journey map, they focused the redesign on continuity: helping creators understand progress, see the effect of their inputs, and avoid discovering missing work only at the end.

## I explored options before committing the team to one layout

I facilitated workshops where participants shared ideas and concerns. I assessed that feedback, carried useful input into the designs, and worked most closely with Pieter. I then created and presented three redesign options.

The selected direction reorganised the task around a stepped workspace. It brought the interaction preview and price estimate into the creation context, separated standard questions from screening and eligibility, and made progression visible without relying on a chain of modals.

<video controls muted playsinline preload="metadata" width="100%">
  <source src="images/08-first-redesign.mp4" type="video/mp4">
  <a href="images/08-first-redesign.mp4">Watch the first staged redesign</a>.
</video>

*The first redesign replaced the long form with a visible sequence, providing a foundation the team could observe and test.*

![A comparison of the earlier linear flow and a modified flow that makes steps, preview, and cost feedback available during creation.](images/03-flow-before-after.png)

*The revised flow moved review and cost feedback closer to the creator’s inputs, reducing the need to leave the task simply to understand its current state.*

![The selected concept presents six creation steps on the left, editable content in the centre, and a preview on the right.](images/04-selected-concept.png)

*The three-column direction made orientation part of the workspace: progress on the left, the active task in the centre, and the audience-facing result on the right.*

<video controls muted playsinline preload="metadata" width="100%">
  <source src="images/10-selected-direction.mp4" type="video/mp4">
  <a href="images/10-selected-direction.mp4">Watch the selected direction and its key changes</a>.
</video>

*The later walkthrough shows the selected layout in motion, including how the creator moves between steps and checks the evolving Interaction.*

## Prototype testing exposed problems the layout alone had not solved

I built an interactive prototype and conducted usability testing in Maze before preparing the handoff. The historical test account identifies three problems that drove the next iteration:

- people could reach finalisation before learning that another section was incomplete;
- managing, editing, and adding questions remained difficult;
- similar button treatments led to wrong clicks.

The original raw Maze report, participant details, task definitions, and sample size have not been recovered. I therefore treat these as documented findings from the project record, not as quantified proof of impact.

The latest case-study design preserves three focused test recordings. They are more useful than a decorative summary because they show the prototype task and the reporting context directly:

- [Watch part of the Maze usability test](https://youtu.be/2YnG8aUv2Sc)
- [Watch the Maze summary report](https://youtu.be/L126ayjPpTY)
- [Watch the usability-breakdown report](https://youtu.be/1wI-G4FqsEw)

*These recordings document the testing workflow. Quantitative results should remain qualified until the task definitions, sample, and export are recovered.*

## Each finding became a specific design response

### Incomplete work became visible before finalisation

I introduced distinct icons, labels, and states for incomplete steps. The aim was to let creators see what still needed attention while they were moving through the flow, instead of reporting missing information only at the end.

### Question sets became easier to scan and rearrange

I changed question management to an accordion pattern and added reordering. This reduced the amount of content visible at once while keeping individual questions accessible for editing.

### Action hierarchy became more explicit

I differentiated the primary “Continue” action from the secondary “Back” action and reconsidered where preview and finalisation belonged. The goal was to reduce competition between actions and make the expected next step clearer.

### Watch the interaction refinements

- [CTA hierarchy and finalisation changes](https://youtu.be/qQh1Kg8P5ng)
- [Accordion and question-management changes](https://youtu.be/NIMnuTMMQV8)
- [Incomplete-step feedback](https://youtu.be/_TbcaEaELtI)

## Where the work landed

The final design package covered Interaction Information, Content, Questions, Screening and Eligibility, Additional Options, Interactor Demographics, preview, step states, and related interaction variants. I prepared the material for developer handoff.

[Watch the final flow walkthrough](https://youtu.be/pijP1Bi8gjc).

This project demonstrates a completed research-to-design iteration and handoff. It does **not yet support a public claim that the redesign shipped or reduced completion time by 47%**. The historical case study reports that figure, but the baseline, cohort, calculation, and production status remain unverified.

The strongest supported outcome is the design transformation itself: a fragmented creation journey became a coherent, test-informed workspace with visible progress, earlier feedback, and clearer control over complex research setup.

## What I would carry forward

This work reinforced two lessons for me. First, simplifying a complex product is not always about removing steps; it can mean making the structure, dependencies, and current state visible. Second, early prototypes can expose interaction problems—such as late validation and competing actions—that are easy to miss when reviewing static screens.

If I resumed the project, I would preserve the original usability-test export and define the measurement plan before release. That would make it possible to connect the design changes to completion, error, and drop-off outcomes without relying on reconstructed evidence later.
