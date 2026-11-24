// Exact probe text from the canonical v1.2 specification.
export default {
  "branches": [
    {
      "id": "A",
      "text": "Decisions take too long or keep getting stuck",
      "probes": [
        "A1",
        "A2",
        "A3",
        "A4"
      ]
    },
    {
      "id": "B",
      "text": "Too much depends on one or a few people",
      "probes": [
        "B1",
        "B2",
        "B3",
        "B4"
      ]
    },
    {
      "id": "C",
      "text": "Agreements don't reliably become action",
      "probes": [
        "C1",
        "C2",
        "C3",
        "C4"
      ]
    },
    {
      "id": "D",
      "text": "Responsibilities or decision authority feel unclear",
      "probes": [
        "D1",
        "D2",
        "D3",
        "D4"
      ]
    },
    {
      "id": "E",
      "text": "Work breaks down between people, teams or handoffs",
      "probes": [
        "E1",
        "E2",
        "E3",
        "E4"
      ]
    },
    {
      "id": "F",
      "text": "We are consistently overloaded or overcommitted",
      "probes": [
        "F1",
        "F2",
        "F3",
        "F4"
      ]
    },
    {
      "id": "G",
      "text": "Important information doesn't reach the right people",
      "probes": [
        "G1",
        "G2",
        "G3",
        "G4"
      ]
    },
    {
      "id": "H",
      "text": "We keep discussing the same problems without changing them",
      "probes": [
        "H1",
        "H2",
        "H3",
        "H4"
      ]
    },
    {
      "id": "I",
      "text": "It is difficult to disagree or raise important problems openly",
      "probes": [
        "I1",
        "I2",
        "I3",
        "I4"
      ]
    }
  ],
  "probes": [
    {
      "id": "A1",
      "dimension": "authority",
      "text": "It is often unclear who has the final say on an important decision."
    },
    {
      "id": "A2",
      "dimension": "authority",
      "text": "A decision may be reopened or overridden after someone was expected to own it."
    },
    {
      "id": "A3",
      "dimension": "informationContext",
      "text": "Decisions wait because the people involved do not have the context they need."
    },
    {
      "id": "A4",
      "dimension": "interfaces",
      "text": "Decisions stall because several people or teams depend on one another without a clear way to resolve the dependency."
    },
    {
      "id": "B1",
      "dimension": "authority",
      "text": "Work often cannot move without approval from one or a few key people, even when someone else is responsible for it."
    },
    {
      "id": "B2",
      "dimension": "informationContext",
      "text": "Important knowledge or context is concentrated in the same few people."
    },
    {
      "id": "B3",
      "dimension": "capacity",
      "text": "Those key people are overloaded partly because so much depends on them."
    },
    {
      "id": "B4",
      "dimension": "adaptation",
      "text": "The team already recognizes this dependency, but has struggled to change it."
    },
    {
      "id": "C1",
      "dimension": "accountability",
      "text": "Important agreements sometimes end without a sufficiently clear owner or observable outcome."
    },
    {
      "id": "C2",
      "dimension": "accountability",
      "text": "People agree to important actions that later fail to happen without being explicitly revisited."
    },
    {
      "id": "C3",
      "dimension": "authority",
      "text": "People may be responsible for outcomes without enough authority to produce them."
    },
    {
      "id": "C4",
      "dimension": "adaptation",
      "text": "The team notices repeated follow-through problems but does not consistently change how commitments are made or reviewed."
    },
    {
      "id": "D1",
      "dimension": "authority",
      "text": "Formal responsibilities do not always match who actually makes the decision."
    },
    {
      "id": "D2",
      "dimension": "authority",
      "text": "More than one person may believe they have the right to approve or override the same work."
    },
    {
      "id": "D3",
      "dimension": "accountability",
      "text": "People can be held responsible for outcomes even when ownership is ambiguous."
    },
    {
      "id": "D4",
      "dimension": "interfaces",
      "text": "When responsibility becomes ambiguous, it is unclear where the issue should be escalated."
    },
    {
      "id": "E1",
      "dimension": "interfaces",
      "text": "Work is handed over without sufficiently clear expectations about what “ready” or “done” means."
    },
    {
      "id": "E2",
      "dimension": "interfaces",
      "text": "When a dependency breaks down, it is often unclear who should resolve it."
    },
    {
      "id": "E3",
      "dimension": "informationContext",
      "text": "Important context is lost when work moves between people or teams."
    },
    {
      "id": "E4",
      "dimension": "accountability",
      "text": "Each part may complete its own responsibility while the overall outcome still lacks a clear owner."
    },
    {
      "id": "F1",
      "dimension": "capacity",
      "text": "The team regularly commits to more work than available time and resources can realistically support."
    },
    {
      "id": "F2",
      "dimension": "capacity",
      "text": "New priorities are added without clearly stopping or deprioritizing existing work."
    },
    {
      "id": "F3",
      "dimension": "authority",
      "text": "People responsible for delivery have limited ability to renegotiate unrealistic commitments."
    },
    {
      "id": "F4",
      "dimension": "interfaces",
      "text": "Overload becomes worse because dependencies or coordination between people create additional work."
    },
    {
      "id": "G1",
      "dimension": "informationContext",
      "text": "People making important decisions often lack relevant information from execution."
    },
    {
      "id": "G2",
      "dimension": "informationContext",
      "text": "Important signals arrive too late to meaningfully change priorities or decisions."
    },
    {
      "id": "G3",
      "dimension": "interfaces",
      "text": "Information tends to get stuck between teams, roles or organizational layers."
    },
    {
      "id": "G4",
      "dimension": "adaptation",
      "text": "Even when important information reaches decision-makers, it does not consistently change what the organization does."
    },
    {
      "id": "H1",
      "dimension": "adaptation",
      "text": "The same organizational problems are discussed repeatedly without producing observable changes."
    },
    {
      "id": "H2",
      "dimension": "adaptation",
      "text": "Changes are introduced, but the team rarely checks whether they actually worked."
    },
    {
      "id": "H3",
      "dimension": "accountability",
      "text": "Conversations produce agreements, but those agreements are not consistently revisited."
    },
    {
      "id": "H4",
      "dimension": "powerRelationships",
      "text": "Some people may understand what needs to change but lack the influence to make it happen."
    },
    {
      "id": "I1",
      "dimension": "powerRelationships",
      "text": "People hesitate to challenge decisions because of hierarchy, status or relationships."
    },
    {
      "id": "I2",
      "dimension": "powerRelationships",
      "text": "Bad news or uncomfortable information may be softened, delayed or avoided."
    },
    {
      "id": "I3",
      "dimension": "informationContext",
      "text": "Decision-makers may receive a more positive picture of reality than people closer to the work experience."
    },
    {
      "id": "I4",
      "dimension": "adaptation",
      "text": "Even when concerns are raised, they do not consistently change decisions or behavior."
    },
    {
      "id": "S1",
      "dimension": "authority",
      "text": "Important work sometimes gets stuck because actual decision authority is unclear or concentrated in unexpected places."
    },
    {
      "id": "S2",
      "dimension": "accountability",
      "text": "Important agreements sometimes fail to become action because ownership or follow-through is unclear."
    },
    {
      "id": "S3",
      "dimension": "informationContext",
      "text": "People sometimes make decisions without important context that exists elsewhere in the organization."
    },
    {
      "id": "S4",
      "dimension": "interfaces",
      "text": "Work sometimes breaks down when it moves between people or teams."
    },
    {
      "id": "S5",
      "dimension": "capacity",
      "text": "The organization regularly commits to more than people can realistically deliver."
    },
    {
      "id": "S6",
      "dimension": "powerRelationships",
      "text": "People sometimes hesitate to raise important concerns because doing so feels personally or politically costly."
    },
    {
      "id": "S7",
      "dimension": "adaptation",
      "text": "The same organizational problems sometimes repeat without meaningful changes in how the team works."
    }
  ],
  "deepening": [
    {
      "id": "deep-authority",
      "dimension": "authority",
      "text": "A decision that appears delegated can still be reopened or overridden by someone else."
    },
    {
      "id": "deep-accountability",
      "dimension": "accountability",
      "text": "People can be responsible for outcomes without a clear owner, review point or sufficient authority."
    },
    {
      "id": "deep-informationContext",
      "dimension": "informationContext",
      "text": "Relevant information often arrives after the moment when it could have changed a decision."
    },
    {
      "id": "deep-interfaces",
      "dimension": "interfaces",
      "text": "When a handoff fails, people do not always know who should resolve the dependency."
    },
    {
      "id": "deep-capacity",
      "dimension": "capacity",
      "text": "New priorities are often added without explicitly removing or renegotiating existing commitments."
    },
    {
      "id": "deep-powerRelationships",
      "dimension": "powerRelationships",
      "text": "There are important issues people know about but find difficult to discuss openly."
    },
    {
      "id": "deep-adaptation",
      "dimension": "adaptation",
      "text": "The team can recognize a recurring problem without producing an observable change afterward."
    }
  ]
};
