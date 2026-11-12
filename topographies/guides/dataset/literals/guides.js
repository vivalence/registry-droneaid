export default [
  {
    "slug": "mari",
    "symbols": [
      {
        "slug": "guide"
      }
    ],
    "trait": {
      "ANNOTATED": {
        "notes": [
          {
            "kind": "WARNING",
            "text": "Carbon-fibre frame parts are strong but can splinter — avoid sharp edges and handle them with care."
          },
          {
            "kind": "MAGNET",
            "text": "Magnets inside the motors are strong — keep them away from loose metal parts and tools."
          }
        ]
      },
      "INSTRUCTED": {
        "images": [],
        "lines": [
          {
            "text": "Builds the PT10 interceptor: frame, motors and stack, then its tail, VTX mount and head."
          }
        ]
      },
      "LABELED": {
        "description": "PT10 interceptor: tilt head, folding tail",
        "name": "Mari Drone assembly manual"
      },
      "SEQUENCED": {
        "sections": [
          {
            "name": "Frame Assembly",
            "steps": [
              "mari.01",
              "mari.02",
              "mari.03",
              "mari.04",
              "mari.05",
              "mari.06",
              "mari.07",
              "mari.08"
            ]
          },
          {
            "name": "Installation of motors",
            "steps": [
              "mari.09",
              "mari.10",
              "mari.11"
            ]
          },
          {
            "name": "Stack (FC & ESC)",
            "steps": [
              "mari.12",
              "mari.13",
              "mari.14",
              "mari.15",
              "mari.16",
              "mari.17"
            ]
          },
          {
            "name": "Tail + ELRS",
            "steps": [
              "mari.18"
            ]
          },
          {
            "name": "Camera + VTX",
            "steps": [
              "mari.19",
              "mari.20"
            ]
          }
        ],
        "subject": "interceptor"
      },
      "STAGED": {
        "camera": {
          "position": [
            0.871,
            0.42,
            0.873
          ],
          "target": [
            0.4209,
            0.02,
            0.4226
          ]
        },
        "explode": 0,
        "ghost": true
      }
    },
    "traits": [
      "LABELED",
      "SEQUENCED",
      "INSTRUCTED",
      "ANNOTATED",
      "STAGED"
    ],
    "uses": [
      {
        "slug": "interceptor"
      },
      {
        "slug": "mari.01"
      },
      {
        "slug": "mari.02"
      },
      {
        "slug": "mari.03"
      },
      {
        "slug": "mari.04"
      },
      {
        "slug": "mari.05"
      },
      {
        "slug": "mari.06"
      },
      {
        "slug": "mari.07"
      },
      {
        "slug": "mari.08"
      },
      {
        "slug": "mari.09"
      },
      {
        "slug": "mari.10"
      },
      {
        "slug": "mari.11"
      },
      {
        "slug": "mari.12"
      },
      {
        "slug": "mari.13"
      },
      {
        "slug": "mari.14"
      },
      {
        "slug": "mari.15"
      },
      {
        "slug": "mari.16"
      },
      {
        "slug": "mari.17"
      },
      {
        "slug": "mari.18"
      },
      {
        "slug": "mari.19"
      },
      {
        "slug": "mari.20"
      }
    ]
  },
  {
    "slug": "quadrocopter",
    "symbols": [
      {
        "slug": "guide"
      }
    ],
    "trait": {
      "ANNOTATED": {
        "notes": [
          {
            "kind": "WARNING",
            "text": "Carbon-fibre frame parts are strong but can splinter — avoid sharp edges and handle them with care."
          },
          {
            "kind": "MAGNET",
            "text": "Magnets inside the motors are strong — keep them away from loose metal parts and tools."
          }
        ]
      },
      "INSTRUCTED": {
        "images": [
          "manual/58cdda885fab.webp",
          "manual/ea3c79da7a28.webp"
        ],
        "lines": [
          {
            "text": "This guide walks you through assembling the DroneAid 10” quadcopter frame, installing motors, stack, video transmitter, receiver, camera and top plate."
          },
          {
            "text": "Follow the steps in order, pay close attention to bolt lengths and cable routing, and ask a mentor whenever something feels unclear."
          },
          {
            "text": "The frame of our FPV drone is made entirely from carbon fiber — a high-performance material renowned for its exceptional strength-to-weight ratio. Carbon fiber is non-magnetic yet electrically conductive."
          },
          {
            "text": "The frame has an X-shape with 4 motor arms. This design is called a quadcopter, which comes from the word “quad”, meaning four — because it uses four motors to fly. Frame weight: 370g."
          }
        ]
      },
      "LABELED": {
        "description": "Assembly Manual (Plug-and-Play) v1.3.1 — EDTH 2026 DroneAid Hamburg",
        "name": "DroneAid Hamburg — Plug-and-Play Assembly"
      },
      "SEQUENCED": {
        "sections": [
          {
            "name": "Frame Assembly",
            "steps": [
              "quadrocopter.01",
              "quadrocopter.02",
              "quadrocopter.03",
              "quadrocopter.04",
              "quadrocopter.05",
              "quadrocopter.06",
              "quadrocopter.07",
              "quadrocopter.08",
              "quadrocopter.09",
              "quadrocopter.10"
            ]
          },
          {
            "name": "Motors installation",
            "steps": [
              "quadrocopter.11",
              "quadrocopter.12",
              "quadrocopter.13"
            ]
          },
          {
            "name": "Stack (FC & ESC)",
            "steps": [
              "quadrocopter.14",
              "quadrocopter.15",
              "quadrocopter.16",
              "quadrocopter.17",
              "quadrocopter.18",
              "quadrocopter.19"
            ]
          },
          {
            "name": "Video Transmitter (VTX)",
            "steps": [
              "quadrocopter.20",
              "quadrocopter.21",
              "quadrocopter.22"
            ]
          },
          {
            "name": "Receiver Installation",
            "steps": [
              "quadrocopter.23",
              "quadrocopter.24"
            ]
          },
          {
            "name": "Install Camera",
            "steps": [
              "quadrocopter.25",
              "quadrocopter.26",
              "quadrocopter.27"
            ]
          },
          {
            "name": "Top Plate installation",
            "steps": [
              "quadrocopter.28",
              "quadrocopter.29",
              "quadrocopter.30"
            ]
          },
          {
            "name": "Checklist",
            "steps": [
              "quadrocopter.31",
              "quadrocopter.32",
              "quadrocopter.33"
            ]
          }
        ],
        "subject": "quadro"
      },
      "STAGED": {
        "camera": {
          "position": [
            0.871,
            0.42,
            0.873
          ],
          "target": [
            0.4209,
            0.02,
            0.4226
          ]
        },
        "explode": 0,
        "ghost": true
      }
    },
    "traits": [
      "LABELED",
      "SEQUENCED",
      "INSTRUCTED",
      "ANNOTATED",
      "STAGED"
    ],
    "uses": [
      {
        "slug": "quadro"
      },
      {
        "slug": "quadrocopter.01"
      },
      {
        "slug": "quadrocopter.02"
      },
      {
        "slug": "quadrocopter.03"
      },
      {
        "slug": "quadrocopter.04"
      },
      {
        "slug": "quadrocopter.05"
      },
      {
        "slug": "quadrocopter.06"
      },
      {
        "slug": "quadrocopter.07"
      },
      {
        "slug": "quadrocopter.08"
      },
      {
        "slug": "quadrocopter.09"
      },
      {
        "slug": "quadrocopter.10"
      },
      {
        "slug": "quadrocopter.11"
      },
      {
        "slug": "quadrocopter.12"
      },
      {
        "slug": "quadrocopter.13"
      },
      {
        "slug": "quadrocopter.14"
      },
      {
        "slug": "quadrocopter.15"
      },
      {
        "slug": "quadrocopter.16"
      },
      {
        "slug": "quadrocopter.17"
      },
      {
        "slug": "quadrocopter.18"
      },
      {
        "slug": "quadrocopter.19"
      },
      {
        "slug": "quadrocopter.20"
      },
      {
        "slug": "quadrocopter.21"
      },
      {
        "slug": "quadrocopter.22"
      },
      {
        "slug": "quadrocopter.23"
      },
      {
        "slug": "quadrocopter.24"
      },
      {
        "slug": "quadrocopter.25"
      },
      {
        "slug": "quadrocopter.26"
      },
      {
        "slug": "quadrocopter.27"
      },
      {
        "slug": "quadrocopter.28"
      },
      {
        "slug": "quadrocopter.29"
      },
      {
        "slug": "quadrocopter.30"
      },
      {
        "slug": "quadrocopter.31"
      },
      {
        "slug": "quadrocopter.32"
      },
      {
        "slug": "quadrocopter.33"
      }
    ]
  },
  {
    "slug": "soldering",
    "symbols": [
      {
        "slug": "guide"
      }
    ],
    "trait": {
      "ANNOTATED": {
        "notes": [
          {
            "kind": "WARNING",
            "text": "Wash your hands after soldering. Don’t touch your face while working."
          }
        ]
      },
      "INSTRUCTED": {
        "images": [
          "manual/6d8443726d85.webp"
        ],
        "lines": [
          {
            "text": "The joints every build needs before its boards go in: how to work, what goes where, how a good joint looks."
          }
        ]
      },
      "LABELED": {
        "description": "Quality soldering checklist; can be done in parallel with Frame Assembly",
        "name": "Soldering"
      },
      "SEQUENCED": {
        "sections": [
          {
            "name": "Before you solder",
            "steps": [
              "soldering.01",
              "soldering.02"
            ]
          },
          {
            "name": "Pinouts",
            "steps": [
              "soldering.03",
              "soldering.04",
              "soldering.05"
            ]
          },
          {
            "name": "Signs of good soldering",
            "steps": [
              "soldering.06"
            ]
          }
        ]
      },
      "STAGED": {
        "explode": 0,
        "ghost": true
      }
    },
    "traits": [
      "LABELED",
      "SEQUENCED",
      "INSTRUCTED",
      "ANNOTATED",
      "STAGED"
    ],
    "uses": [
      {
        "slug": "soldering.01"
      },
      {
        "slug": "soldering.02"
      },
      {
        "slug": "soldering.03"
      },
      {
        "slug": "soldering.04"
      },
      {
        "slug": "soldering.05"
      },
      {
        "slug": "soldering.06"
      }
    ]
  }
];
