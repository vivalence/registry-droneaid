export default [
  {
    "slug": "droneaid.01",
    "symbols": [
      {
        "slug": "step"
      },
      {
        "slug": "tool.bolt_organizer"
      },
      {
        "slug": "tool.screw_gauge"
      }
    ],
    "trait": {
      "ANNOTATED": {
        "notes": [
          {
            "symbols": [
              "note.warning",
              "warn.length"
            ],
            "text": "Look for 30mm bolts in the stack set, 12mm in the additional package."
          },
          {
            "symbols": [
              "note.tip"
            ],
            "text": "Use a magnetic bolt organizer."
          }
        ]
      },
      "ASSEMBLED": {
        "placements": []
      },
      "INSTRUCTED": {
        "images": [
          "manual/9547e69a9046.webp",
          "manual/c5ca536dc674.webp",
          "manual/58060fba8463.webp"
        ],
        "lines": [
          {
            "text": "Unpack the frame and identify all frame components."
          },
          {
            "text": "Bottom plate 1x, top plate 1x, arm sandwich plate 1x, battery pad 1x, arms 4x, battery straps 2x, additional RX antenna mount 1x, camera mount 2x, antenna mount 1x, standoffs 8x, bolts."
          },
          {
            "text": "Before starting, sort all bolts by size using the measure tool."
          },
          {
            "text": "Bolt sizes: 30mm 4x (stack), 28mm 4x (long), 18mm 4x (medium), 16mm 6x (short), 12mm 1x (RX antenna), 8mm 16x (top plate), 4mm 2x (M2, thin, camera)."
          }
        ]
      },
      "LABELED": {
        "description": "Frame Assembly. Manual p4.",
        "name": "Unpack and sort the kit"
      },
      "STAGED": {
        "camera": {
          "position": [
            0.721,
            0.3,
            0.723
          ],
          "target": [
            0.4209,
            0.02,
            0.4226
          ]
        },
        "ghost": true
      }
    },
    "traits": [
      "LABELED",
      "ASSEMBLED",
      "INSTRUCTED",
      "ANNOTATED",
      "STAGED"
    ]
  },
  {
    "slug": "droneaid.02",
    "symbols": [
      {
        "slug": "step"
      },
      {
        "slug": "tool.hex_2_0"
      }
    ],
    "trait": {
      "ANNOTATED": {
        "notes": []
      },
      "ASSEMBLED": {
        "placements": [
          {
            "active": true,
            "literal": "drone.frame_root.0"
          }
        ]
      },
      "INSTRUCTED": {
        "images": [
          "manual/8e8e29009e7f.webp",
          "manual/2dab0a680257.webp"
        ],
        "lines": [
          {
            "text": "Prepare to join: bottom plate [1], sandwich plate [3], arms [6]; bolts 18mm 4x (medium), 16mm 6x (short); standoffs 4x; screwdriver Hex 2.0."
          },
          {
            "text": "Identify the top side of the bottom plate [1]: the top side is where integrated nuts are inserted into the frame and sticking out of it."
          },
          {
            "text": "Place the bottom plate [1] in front of you, bottom side up."
          },
          {
            "text": "Make sure that nuts are not sticking out to the top."
          }
        ]
      },
      "LABELED": {
        "description": "Frame Assembly. Manual p5.",
        "name": "The bottom plate, bottom side up"
      },
      "STAGED": {
        "camera": {
          "position": [
            0.721,
            0.3,
            0.723
          ],
          "target": [
            0.4209,
            0.02,
            0.4226
          ]
        },
        "ghost": true
      }
    },
    "traits": [
      "LABELED",
      "ASSEMBLED",
      "INSTRUCTED",
      "ANNOTATED",
      "STAGED"
    ],
    "uses": [
      {
        "slug": "drone.frame_root.0"
      }
    ]
  },
  {
    "slug": "droneaid.03",
    "symbols": [
      {
        "slug": "step"
      },
      {
        "slug": "tool.hex_2_0"
      }
    ],
    "trait": {
      "ANNOTATED": {
        "notes": [
          {
            "symbols": [
              "note.warning",
              "warn.loose"
            ],
            "text": "Don’t tighten it yet! Leave it loose."
          }
        ]
      },
      "ASSEMBLED": {
        "placements": [
          {
            "active": true,
            "literal": "drone.motor_arm.0"
          },
          {
            "active": true,
            "literal": "drone.frame_bottom.0"
          },
          {
            "active": true,
            "literal": "drone.bolt_m3_16.0"
          }
        ]
      },
      "INSTRUCTED": {
        "images": [
          "manual/cf5a470bc835.webp",
          "manual/20d885202ff6.webp",
          "manual/dff5a5f0dab5.webp"
        ],
        "lines": [
          {
            "text": "Place one arm at the appropriate position on top."
          },
          {
            "text": "Cover it by the bottom plate and thread the 16mm bolt."
          }
        ]
      },
      "LABELED": {
        "description": "Frame Assembly. Manual p6.",
        "name": "The first arm"
      },
      "STAGED": {
        "camera": {
          "position": [
            0.721,
            0.3,
            0.723
          ],
          "target": [
            0.4209,
            0.02,
            0.4226
          ]
        },
        "ghost": true
      }
    },
    "traits": [
      "LABELED",
      "ASSEMBLED",
      "INSTRUCTED",
      "ANNOTATED",
      "STAGED"
    ],
    "uses": [
      {
        "slug": "drone.bolt_m3_16.0"
      },
      {
        "slug": "drone.frame_bottom.0"
      },
      {
        "slug": "drone.motor_arm.0"
      }
    ]
  },
  {
    "slug": "droneaid.04",
    "symbols": [
      {
        "slug": "step"
      },
      {
        "slug": "tool.hex_2_0"
      }
    ],
    "trait": {
      "ANNOTATED": {
        "notes": [
          {
            "symbols": [
              "note.warning",
              "warn.loose"
            ],
            "text": "Don’t tighten it yet! Leave it loose."
          }
        ]
      },
      "ASSEMBLED": {
        "placements": [
          {
            "active": true,
            "literal": "drone.motor_arm.1"
          },
          {
            "active": true,
            "literal": "drone.bolt_m3_16.1"
          }
        ]
      },
      "INSTRUCTED": {
        "images": [
          "manual/058347a42b8b.webp",
          "manual/d4b6b6d2cf32.webp",
          "manual/8dc4dc4db648.webp",
          "manual/30f60e40f264.webp"
        ],
        "lines": [
          {
            "text": "Place the second arm at the appropriate position on top of the middle frame."
          },
          {
            "text": "Align the bottom plate and thread the 16mm bolt to secure the second arm."
          }
        ]
      },
      "LABELED": {
        "description": "Frame Assembly. Manual p7.",
        "name": "The second arm"
      },
      "STAGED": {
        "camera": {
          "position": [
            0.721,
            0.3,
            0.723
          ],
          "target": [
            0.4209,
            0.02,
            0.4226
          ]
        },
        "ghost": true
      }
    },
    "traits": [
      "LABELED",
      "ASSEMBLED",
      "INSTRUCTED",
      "ANNOTATED",
      "STAGED"
    ],
    "uses": [
      {
        "slug": "drone.bolt_m3_16.1"
      },
      {
        "slug": "drone.motor_arm.1"
      }
    ]
  },
  {
    "slug": "droneaid.05",
    "symbols": [
      {
        "slug": "step"
      },
      {
        "slug": "tool.hex_2_0"
      }
    ],
    "trait": {
      "ANNOTATED": {
        "notes": [
          {
            "symbols": [
              "note.warning",
              "warn.loose"
            ],
            "text": "Don’t tighten it yet! Leave it loose."
          }
        ]
      },
      "ASSEMBLED": {
        "placements": [
          {
            "active": true,
            "literal": "drone.motor_arm.2"
          },
          {
            "active": true,
            "literal": "drone.motor_arm.3"
          },
          {
            "active": true,
            "literal": "drone.bolt_m3_16.2"
          },
          {
            "active": true,
            "literal": "drone.bolt_m3_16.3"
          }
        ]
      },
      "INSTRUCTED": {
        "images": [
          "manual/7edcc1800f63.webp",
          "manual/69f6eb81863f.webp",
          "manual/a5cbefd7a824.webp"
        ],
        "lines": [
          {
            "text": "Place remaining arms between the middle and bottom plates at the appropriate positions one by one and thread the 16mm bolts."
          }
        ]
      },
      "LABELED": {
        "description": "Frame Assembly. Manual p8.",
        "name": "The remaining arms"
      },
      "STAGED": {
        "camera": {
          "position": [
            0.721,
            0.3,
            0.723
          ],
          "target": [
            0.4209,
            0.02,
            0.4226
          ]
        },
        "ghost": true
      }
    },
    "traits": [
      "LABELED",
      "ASSEMBLED",
      "INSTRUCTED",
      "ANNOTATED",
      "STAGED"
    ],
    "uses": [
      {
        "slug": "drone.bolt_m3_16.2"
      },
      {
        "slug": "drone.bolt_m3_16.3"
      },
      {
        "slug": "drone.motor_arm.2"
      },
      {
        "slug": "drone.motor_arm.3"
      }
    ]
  },
  {
    "slug": "droneaid.06",
    "symbols": [
      {
        "slug": "step"
      },
      {
        "slug": "tool.hex_2_0"
      }
    ],
    "trait": {
      "ANNOTATED": {
        "notes": [
          {
            "symbols": [
              "note.warning",
              "warn.length"
            ],
            "text": "Make sure to use 18mm bolts (not 16mm)."
          }
        ]
      },
      "ASSEMBLED": {
        "placements": [
          {
            "active": true,
            "literal": "drone.bolt_m3_18.0"
          },
          {
            "active": true,
            "literal": "drone.bolt_m3_18.1"
          },
          {
            "active": true,
            "literal": "drone.bolt_m3_18.2"
          },
          {
            "active": true,
            "literal": "drone.bolt_m3_18.3"
          },
          {
            "active": true,
            "literal": "drone.bolt_m3_16.4"
          },
          {
            "active": true,
            "literal": "drone.bolt_m3_16.5"
          }
        ]
      },
      "INSTRUCTED": {
        "images": [
          "manual/908753982ca2.webp",
          "manual/0f60c7a91ed5.webp",
          "manual/9564b17767bd.webp",
          "manual/5b0f7ec0c436.webp"
        ],
        "lines": [
          {
            "text": "Insert 4x 18mm bolts."
          },
          {
            "text": "Note: there is no thread there. Just insert bolts until the end."
          },
          {
            "text": "Thread 2x remaining 16mm bolts."
          }
        ]
      },
      "LABELED": {
        "description": "Frame Assembly. Manual p9.",
        "name": "The 18mm bolts and the last two 16mm"
      },
      "STAGED": {
        "camera": {
          "position": [
            0.721,
            0.3,
            0.723
          ],
          "target": [
            0.4209,
            0.02,
            0.4226
          ]
        },
        "ghost": true
      }
    },
    "traits": [
      "LABELED",
      "ASSEMBLED",
      "INSTRUCTED",
      "ANNOTATED",
      "STAGED"
    ],
    "uses": [
      {
        "slug": "drone.bolt_m3_16.4"
      },
      {
        "slug": "drone.bolt_m3_16.5"
      },
      {
        "slug": "drone.bolt_m3_18.0"
      },
      {
        "slug": "drone.bolt_m3_18.1"
      },
      {
        "slug": "drone.bolt_m3_18.2"
      },
      {
        "slug": "drone.bolt_m3_18.3"
      }
    ]
  },
  {
    "slug": "droneaid.07",
    "symbols": [
      {
        "slug": "step"
      },
      {
        "slug": "tool.jig"
      }
    ],
    "trait": {
      "ANNOTATED": {
        "notes": [
          {
            "symbols": [
              "note.tip"
            ],
            "text": "Use the 3D printed helper to hold 4 bolts."
          }
        ]
      },
      "ASSEMBLED": {
        "placements": [
          {
            "active": true,
            "literal": "drone.standoff.0"
          },
          {
            "active": true,
            "literal": "drone.standoff.1"
          },
          {
            "active": true,
            "literal": "drone.standoff.2"
          },
          {
            "active": true,
            "literal": "drone.standoff.3"
          }
        ]
      },
      "INSTRUCTED": {
        "images": [
          "manual/44f5b4027630.webp",
          "manual/3e6b926ad299.webp",
          "manual/169e2fa2faca.webp"
        ],
        "lines": [
          {
            "text": "Flop the frame upside down."
          },
          {
            "text": "Thread and tighten stands with 18mm screws sticking above the top side of the middle plate."
          }
        ]
      },
      "LABELED": {
        "description": "Frame Assembly. Manual p10.",
        "name": "Flip the frame, thread the stack standoffs"
      },
      "STAGED": {
        "camera": {
          "position": [
            0.721,
            0.3,
            0.723
          ],
          "target": [
            0.4209,
            0.02,
            0.4226
          ]
        },
        "ghost": true
      }
    },
    "traits": [
      "LABELED",
      "ASSEMBLED",
      "INSTRUCTED",
      "ANNOTATED",
      "STAGED"
    ],
    "uses": [
      {
        "slug": "drone.standoff.0"
      },
      {
        "slug": "drone.standoff.1"
      },
      {
        "slug": "drone.standoff.2"
      },
      {
        "slug": "drone.standoff.3"
      }
    ]
  },
  {
    "slug": "droneaid.08",
    "symbols": [
      {
        "slug": "step"
      },
      {
        "slug": "tool.hex_2_0"
      }
    ],
    "trait": {
      "ANNOTATED": {
        "notes": [
          {
            "symbols": [
              "note.warning",
              "warn.length"
            ],
            "text": "Check that bolts don’t stick out of the nut more than 1mm (see pictures). If they’re sticking out too much, this means that wrong bolts had been used, and it should be fixed."
          },
          {
            "symbols": [
              "note.warning",
              "warn.tight"
            ],
            "text": "Tighten firmly."
          }
        ]
      },
      "ASSEMBLED": {
        "placements": [
          {
            "active": true,
            "literal": "drone.standoff.4"
          },
          {
            "active": true,
            "literal": "drone.standoff.5"
          },
          {
            "active": true,
            "literal": "drone.standoff.6"
          },
          {
            "active": true,
            "literal": "drone.standoff.7"
          },
          {
            "active": true,
            "literal": "drone.bolt_m3_8.0"
          },
          {
            "active": true,
            "literal": "drone.bolt_m3_8.1"
          },
          {
            "active": true,
            "literal": "drone.bolt_m3_8.2"
          },
          {
            "active": true,
            "literal": "drone.bolt_m3_8.3"
          }
        ]
      },
      "INSTRUCTED": {
        "images": [
          "manual/54c17ea5bc94.webp",
          "manual/213c025950f7.webp",
          "manual/8a8a98b2c14d.webp"
        ],
        "lines": [
          {
            "text": "Tighten all 6x 16mm bolts firmly."
          },
          {
            "text": "Prepare M3 screws 8mm 4x, standoffs 4x, screwdriver Hex 2.0."
          },
          {
            "text": "Tighten remaining 4x standoffs to the corners of the middle plate using 8mm bolts."
          }
        ]
      },
      "LABELED": {
        "description": "Frame Assembly. Manual p11.",
        "name": "Tighten the 16mm bolts, add the corner standoffs"
      },
      "STAGED": {
        "camera": {
          "position": [
            0.721,
            0.3,
            0.723
          ],
          "target": [
            0.4209,
            0.02,
            0.4226
          ]
        },
        "ghost": true
      }
    },
    "traits": [
      "LABELED",
      "ASSEMBLED",
      "INSTRUCTED",
      "ANNOTATED",
      "STAGED"
    ],
    "uses": [
      {
        "slug": "drone.bolt_m3_8.0"
      },
      {
        "slug": "drone.bolt_m3_8.1"
      },
      {
        "slug": "drone.bolt_m3_8.2"
      },
      {
        "slug": "drone.bolt_m3_8.3"
      },
      {
        "slug": "drone.standoff.4"
      },
      {
        "slug": "drone.standoff.5"
      },
      {
        "slug": "drone.standoff.6"
      },
      {
        "slug": "drone.standoff.7"
      }
    ]
  },
  {
    "slug": "droneaid.09",
    "symbols": [
      {
        "slug": "step"
      }
    ],
    "trait": {
      "ANNOTATED": {
        "notes": [
          {
            "symbols": [
              "note.warning",
              "warn.orientation"
            ],
            "text": "Pay attention to the front of the frame and the 3D print position."
          }
        ]
      },
      "ASSEMBLED": {
        "placements": [
          {
            "active": true,
            "literal": "drone.cam_holder.0"
          },
          {
            "active": true,
            "literal": "drone.cam_holder.1"
          }
        ]
      },
      "INSTRUCTED": {
        "images": [
          "manual/584294c32a81.webp",
          "manual/2e4d9502df6b.webp"
        ],
        "lines": [
          {
            "text": "Prepare the 3D printed camera holder."
          },
          {
            "text": "Add the 3D printed part for the camera in front."
          }
        ]
      },
      "LABELED": {
        "description": "Frame Assembly. Manual p12.",
        "name": "The camera holder"
      },
      "STAGED": {
        "camera": {
          "position": [
            0.721,
            0.3,
            0.723
          ],
          "target": [
            0.4209,
            0.02,
            0.4226
          ]
        },
        "ghost": true
      }
    },
    "traits": [
      "LABELED",
      "ASSEMBLED",
      "INSTRUCTED",
      "ANNOTATED",
      "STAGED"
    ],
    "uses": [
      {
        "slug": "drone.cam_holder.0"
      },
      {
        "slug": "drone.cam_holder.1"
      }
    ]
  },
  {
    "slug": "droneaid.10",
    "symbols": [
      {
        "slug": "step"
      }
    ],
    "trait": {
      "ANNOTATED": {
        "notes": [
          {
            "symbols": [
              "note.warning",
              "warn.orientation"
            ],
            "text": "Pay attention to the back of the frame and the 3D print position."
          }
        ]
      },
      "ASSEMBLED": {
        "placements": [
          {
            "active": true,
            "literal": "drone.antenna_mount.0"
          }
        ]
      },
      "INSTRUCTED": {
        "images": [
          "manual/ee8a9af92b13.webp",
          "manual/95060dae96e8.webp"
        ],
        "lines": [
          {
            "text": "Prepare the 3D printed antenna mount."
          },
          {
            "text": "Add the 3D printed part for antennas on the back."
          },
          {
            "text": "Check your work."
          },
          {
            "text": "Now the assembly of the frame is finished, and we can proceed to the installation of the motors."
          }
        ]
      },
      "LABELED": {
        "description": "Frame Assembly. Manual p13.",
        "name": "The antenna mount — the frame is done"
      },
      "STAGED": {
        "camera": {
          "position": [
            0.721,
            0.3,
            0.723
          ],
          "target": [
            0.4209,
            0.02,
            0.4226
          ]
        },
        "ghost": true
      }
    },
    "traits": [
      "LABELED",
      "ASSEMBLED",
      "INSTRUCTED",
      "ANNOTATED",
      "STAGED"
    ],
    "uses": [
      {
        "slug": "drone.antenna_mount.0"
      }
    ]
  },
  {
    "slug": "droneaid.11",
    "symbols": [
      {
        "slug": "step"
      },
      {
        "slug": "tool.hex_2_0"
      }
    ],
    "trait": {
      "ANNOTATED": {
        "notes": [
          {
            "symbols": [
              "note.warning",
              "warn.magnet"
            ],
            "text": "Attention! The motor has powerful magnets inside of it. Make sure to keep them away from anything that can get attracted and stick to them — bolts, nuts, tools, etc."
          },
          {
            "symbols": [
              "note.warning",
              "warn.length"
            ],
            "text": "When the screw comes out of the beam and is screwed into the motor, it must reach the end of the motor base and not touch the winding."
          },
          {
            "symbols": [
              "note.warning",
              "warn.length"
            ],
            "text": "The screw should extend approx. 3mm through the arm."
          }
        ]
      },
      "ASSEMBLED": {
        "placements": []
      },
      "INSTRUCTED": {
        "images": [
          "manual/7a51e1d48932.webp",
          "manual/3b2068978349.webp"
        ],
        "lines": [
          {
            "text": "Open the package that comes with the motor. Use 4x 10mm bolts and one big nut for the motor."
          },
          {
            "text": "Before installing the motors, we need to make sure that the bolts are the right length. For a 10” drone, it's a 10mm bolt."
          },
          {
            "text": "We need to make sure that they do not touch the motor windings, and at the same time hold the motors firmly."
          }
        ]
      },
      "LABELED": {
        "description": "Motors installation. Manual p14.",
        "name": "Check the motor bolts"
      },
      "STAGED": {
        "camera": {
          "position": [
            0.471,
            0.57,
            0.723
          ],
          "target": [
            0.4209,
            0.02,
            0.4226
          ]
        },
        "ghost": true
      }
    },
    "traits": [
      "LABELED",
      "ASSEMBLED",
      "INSTRUCTED",
      "ANNOTATED",
      "STAGED"
    ]
  },
  {
    "slug": "droneaid.12",
    "symbols": [
      {
        "slug": "step"
      },
      {
        "slug": "tool.hex_2_0"
      }
    ],
    "trait": {
      "ANNOTATED": {
        "notes": [
          {
            "symbols": [
              "note.warning",
              "warn.orientation"
            ],
            "text": "Pay attention to motors and cables orientation."
          }
        ]
      },
      "ASSEMBLED": {
        "placements": [
          {
            "active": true,
            "literal": "drone.motor.0"
          },
          {
            "active": true,
            "literal": "drone.prop_nut_m5.0"
          },
          {
            "active": true,
            "literal": "drone.bolt_m3_10.0"
          },
          {
            "active": true,
            "literal": "drone.bolt_m3_10.1"
          },
          {
            "active": true,
            "literal": "drone.bolt_m3_10.2"
          },
          {
            "active": true,
            "literal": "drone.bolt_m3_10.3"
          }
        ]
      },
      "INSTRUCTED": {
        "images": [
          "manual/0de99034f993.webp",
          "manual/8571933e5965.webp",
          "manual/c485cb3e99c6.webp",
          "manual/86cd2af99fb4.webp",
          "manual/a88f6a687044.webp"
        ],
        "lines": [
          {
            "text": "Screw the nut onto the motor by hand. Do not tighten it."
          },
          {
            "text": "Screw and tighten all 4 bolts for one motor."
          },
          {
            "text": "Please don’t glue motors to the frame yet."
          }
        ]
      },
      "LABELED": {
        "description": "Motors installation. Manual p15–16.",
        "name": "The first motor"
      },
      "STAGED": {
        "camera": {
          "position": [
            0.471,
            0.57,
            0.723
          ],
          "target": [
            0.4209,
            0.02,
            0.4226
          ]
        },
        "ghost": true
      }
    },
    "traits": [
      "LABELED",
      "ASSEMBLED",
      "INSTRUCTED",
      "ANNOTATED",
      "STAGED"
    ],
    "uses": [
      {
        "slug": "drone.bolt_m3_10.0"
      },
      {
        "slug": "drone.bolt_m3_10.1"
      },
      {
        "slug": "drone.bolt_m3_10.2"
      },
      {
        "slug": "drone.bolt_m3_10.3"
      },
      {
        "slug": "drone.motor.0"
      },
      {
        "slug": "drone.prop_nut_m5.0"
      }
    ]
  },
  {
    "slug": "droneaid.13",
    "symbols": [
      {
        "slug": "step"
      },
      {
        "slug": "tool.hex_2_0"
      }
    ],
    "trait": {
      "ANNOTATED": {
        "notes": [
          {
            "symbols": [
              "note.warning",
              "warn.orientation"
            ],
            "text": "Pay attention to motors and cables orientation."
          }
        ]
      },
      "ASSEMBLED": {
        "placements": [
          {
            "active": true,
            "literal": "drone.motor.1"
          },
          {
            "active": true,
            "literal": "drone.motor.2"
          },
          {
            "active": true,
            "literal": "drone.motor.3"
          },
          {
            "active": true,
            "literal": "drone.prop_nut_m5.1"
          },
          {
            "active": true,
            "literal": "drone.prop_nut_m5.2"
          },
          {
            "active": true,
            "literal": "drone.prop_nut_m5.3"
          },
          {
            "active": true,
            "literal": "drone.bolt_m3_10.4"
          },
          {
            "active": true,
            "literal": "drone.bolt_m3_10.5"
          },
          {
            "active": true,
            "literal": "drone.bolt_m3_10.6"
          },
          {
            "active": true,
            "literal": "drone.bolt_m3_10.7"
          },
          {
            "active": true,
            "literal": "drone.bolt_m3_10.8"
          },
          {
            "active": true,
            "literal": "drone.bolt_m3_10.9"
          },
          {
            "active": true,
            "literal": "drone.bolt_m3_10.10"
          },
          {
            "active": true,
            "literal": "drone.bolt_m3_10.11"
          },
          {
            "active": true,
            "literal": "drone.bolt_m3_10.12"
          },
          {
            "active": true,
            "literal": "drone.bolt_m3_10.13"
          },
          {
            "active": true,
            "literal": "drone.bolt_m3_10.14"
          },
          {
            "active": true,
            "literal": "drone.bolt_m3_10.15"
          }
        ]
      },
      "INSTRUCTED": {
        "images": [
          "manual/fb0273e59330.webp",
          "manual/7e8d53ef6015.webp"
        ],
        "lines": [
          {
            "text": "Repeat steps 1–5 for all 4 motors."
          }
        ]
      },
      "LABELED": {
        "description": "Motors installation. Manual p16.",
        "name": "The other three motors"
      },
      "STAGED": {
        "camera": {
          "position": [
            0.471,
            0.57,
            0.723
          ],
          "target": [
            0.4209,
            0.02,
            0.4226
          ]
        },
        "ghost": true
      }
    },
    "traits": [
      "LABELED",
      "ASSEMBLED",
      "INSTRUCTED",
      "ANNOTATED",
      "STAGED"
    ],
    "uses": [
      {
        "slug": "drone.bolt_m3_10.10"
      },
      {
        "slug": "drone.bolt_m3_10.11"
      },
      {
        "slug": "drone.bolt_m3_10.12"
      },
      {
        "slug": "drone.bolt_m3_10.13"
      },
      {
        "slug": "drone.bolt_m3_10.14"
      },
      {
        "slug": "drone.bolt_m3_10.15"
      },
      {
        "slug": "drone.bolt_m3_10.4"
      },
      {
        "slug": "drone.bolt_m3_10.5"
      },
      {
        "slug": "drone.bolt_m3_10.6"
      },
      {
        "slug": "drone.bolt_m3_10.7"
      },
      {
        "slug": "drone.bolt_m3_10.8"
      },
      {
        "slug": "drone.bolt_m3_10.9"
      },
      {
        "slug": "drone.motor.1"
      },
      {
        "slug": "drone.motor.2"
      },
      {
        "slug": "drone.motor.3"
      },
      {
        "slug": "drone.prop_nut_m5.1"
      },
      {
        "slug": "drone.prop_nut_m5.2"
      },
      {
        "slug": "drone.prop_nut_m5.3"
      }
    ]
  },
  {
    "slug": "droneaid.14",
    "symbols": [
      {
        "slug": "step"
      },
      {
        "slug": "tool.hex_2_0"
      },
      {
        "slug": "tool.tweezers"
      }
    ],
    "trait": {
      "ANNOTATED": {
        "notes": [
          {
            "symbols": [
              "note.warning"
            ],
            "text": "Please note that the connectors will be needed for installing peripherals at later stages."
          },
          {
            "symbols": [
              "note.warning",
              "warn.orientation"
            ],
            "text": "Pay attention to cable orientation. Don’t push it too hard."
          },
          {
            "symbols": [
              "note.warning",
              "warn.length"
            ],
            "text": "There are 28mm screws in the frame set — we don’t use them."
          }
        ]
      },
      "ASSEMBLED": {
        "placements": [
          {
            "active": true,
            "literal": "drone.bolt_m3_30.0"
          },
          {
            "active": true,
            "literal": "drone.bolt_m3_30.1"
          },
          {
            "active": true,
            "literal": "drone.bolt_m3_30.2"
          },
          {
            "active": true,
            "literal": "drone.bolt_m3_30.3"
          }
        ]
      },
      "INSTRUCTED": {
        "images": [
          "manual/dd65b491478c.webp",
          "manual/871ef07b242a.webp",
          "manual/db2424299dc6.webp",
          "manual/4fcf124b3dcb.webp"
        ],
        "lines": [
          {
            "text": "Open the package that comes with the stack: flight controller (FC), electronic speed controller (ESC), silicone grommets for FC and ESC and stack screws (30 mm), connectors for motors (not used), various connectors (FC to VTX, FC to camera, FC to ELRS), the connector between FC and ESC."
          },
          {
            "text": "Connect the 8-pin cable to the ESC."
          },
          {
            "text": "Take the four screws from the stack set (M3 30mm, round head) and insert them from the bottom into the bottom/mid plate and screw them into the nuts in the mid plate."
          },
          {
            "text": "Tighten well."
          }
        ]
      },
      "LABELED": {
        "description": "Stack (FC & ESC). Manual p17–18.",
        "name": "The stack bolts"
      },
      "STAGED": {
        "camera": {
          "position": [
            0.605,
            0.18,
            0.603
          ],
          "target": [
            0.425,
            0.02,
            0.4227
          ]
        },
        "ghost": true
      }
    },
    "traits": [
      "LABELED",
      "ASSEMBLED",
      "INSTRUCTED",
      "ANNOTATED",
      "STAGED"
    ],
    "uses": [
      {
        "slug": "drone.bolt_m3_30.0"
      },
      {
        "slug": "drone.bolt_m3_30.1"
      },
      {
        "slug": "drone.bolt_m3_30.2"
      },
      {
        "slug": "drone.bolt_m3_30.3"
      }
    ]
  },
  {
    "slug": "droneaid.15",
    "symbols": [
      {
        "slug": "step"
      },
      {
        "slug": "tool.tweezers"
      }
    ],
    "trait": {
      "ANNOTATED": {
        "notes": [
          {
            "symbols": [
              "note.warning",
              "warn.orientation"
            ],
            "text": "Pay attention to grommets orientation (longer side upwards)."
          },
          {
            "symbols": [
              "note.tip"
            ],
            "text": "Use tweezers if necessary."
          }
        ]
      },
      "ASSEMBLED": {
        "placements": [
          {
            "active": true,
            "literal": "drone.grommet.0"
          },
          {
            "active": true,
            "literal": "drone.grommet.1"
          },
          {
            "active": true,
            "literal": "drone.grommet.2"
          },
          {
            "active": true,
            "literal": "drone.grommet.3"
          }
        ]
      },
      "INSTRUCTED": {
        "images": [
          "manual/c37ee3e32817.webp",
          "manual/7a048e5a005a.webp",
          "manual/645ad8d9e0e7.webp",
          "manual/b392d5885d18.webp"
        ],
        "lines": [
          {
            "text": "Place 4 silicone grommets on the 4 bolts for the stack."
          },
          {
            "text": "Insert silicone grommets into the holes on the ESC: squeeze the silicone grommets from both sides, insert one side into the hole, adjust so that the silicone grommet is completely in place."
          }
        ]
      },
      "LABELED": {
        "description": "Stack (FC & ESC). Manual p19.",
        "name": "Grommets on the stack bolts"
      },
      "STAGED": {
        "camera": {
          "position": [
            0.605,
            0.18,
            0.603
          ],
          "target": [
            0.425,
            0.02,
            0.4227
          ]
        },
        "ghost": true
      }
    },
    "traits": [
      "LABELED",
      "ASSEMBLED",
      "INSTRUCTED",
      "ANNOTATED",
      "STAGED"
    ],
    "uses": [
      {
        "slug": "drone.grommet.0"
      },
      {
        "slug": "drone.grommet.1"
      },
      {
        "slug": "drone.grommet.2"
      },
      {
        "slug": "drone.grommet.3"
      }
    ]
  },
  {
    "slug": "droneaid.16",
    "symbols": [
      {
        "slug": "step"
      }
    ],
    "trait": {
      "ANNOTATED": {
        "notes": [
          {
            "symbols": [
              "note.warning",
              "warn.wires"
            ],
            "text": "Make sure motor cables are aligned as on the photo."
          }
        ]
      },
      "ASSEMBLED": {
        "placements": [
          {
            "active": true,
            "literal": "drone.esc.0"
          }
        ]
      },
      "INSTRUCTED": {
        "images": [
          "manual/24b25dbe9a4b.webp",
          "manual/f5e7e808a2cf.webp"
        ],
        "lines": [
          {
            "text": "Slide 4 silicone grommets into the ESC's holes and then install the ESC on the frame."
          },
          {
            "text": "The green grommets allow the FC and ESC to be installed in such a way that they isolate the stack from vibrations from the propellers during the flight."
          },
          {
            "text": "Place the ESC with the power cables towards the antennas."
          }
        ]
      },
      "LABELED": {
        "description": "Stack (FC & ESC). Manual p20.",
        "name": "The ESC"
      },
      "STAGED": {
        "camera": {
          "position": [
            0.605,
            0.18,
            0.603
          ],
          "target": [
            0.425,
            0.02,
            0.4227
          ]
        },
        "ghost": true
      }
    },
    "traits": [
      "LABELED",
      "ASSEMBLED",
      "INSTRUCTED",
      "ANNOTATED",
      "STAGED"
    ],
    "uses": [
      {
        "slug": "drone.esc.0"
      }
    ]
  },
  {
    "slug": "droneaid.17",
    "symbols": [
      {
        "slug": "step"
      },
      {
        "slug": "tool.tweezers"
      }
    ],
    "trait": {
      "ANNOTATED": {
        "notes": [
          {
            "symbols": [
              "note.warning",
              "warn.orientation"
            ],
            "text": "Pay attention to grommets orientation (longer side downwards)."
          }
        ]
      },
      "ASSEMBLED": {
        "placements": [
          {
            "active": true,
            "literal": "drone.motor_wire.0"
          },
          {
            "active": true,
            "literal": "drone.motor_wire.1"
          },
          {
            "active": true,
            "literal": "drone.motor_wire.2"
          },
          {
            "active": true,
            "literal": "drone.motor_wire.3"
          },
          {
            "active": true,
            "literal": "drone.grommet.4"
          },
          {
            "active": true,
            "literal": "drone.grommet.5"
          },
          {
            "active": true,
            "literal": "drone.grommet.6"
          },
          {
            "active": true,
            "literal": "drone.grommet.7"
          }
        ]
      },
      "INSTRUCTED": {
        "images": [
          "manual/fb96fc1c7365.webp",
          "manual/1d216555bc7c.webp",
          "manual/bf99322459e6.webp"
        ],
        "lines": [
          {
            "text": "Connect the four motor connectors with the ESC connectors by just plugging them in."
          },
          {
            "text": "It is important to avoid dangling wires."
          },
          {
            "text": "Wrap the motor wires around the stands once."
          },
          {
            "text": "Make sure to use the nearest motor outputs when connecting each motor."
          },
          {
            "text": "Insert silicone grommets into the holes on the FC."
          }
        ]
      },
      "LABELED": {
        "description": "Stack (FC & ESC). Manual p21.",
        "name": "Motor wires, grommets for the FC"
      },
      "STAGED": {
        "camera": {
          "position": [
            0.605,
            0.18,
            0.603
          ],
          "target": [
            0.425,
            0.02,
            0.4227
          ]
        },
        "ghost": true
      }
    },
    "traits": [
      "LABELED",
      "ASSEMBLED",
      "INSTRUCTED",
      "ANNOTATED",
      "STAGED"
    ],
    "uses": [
      {
        "slug": "drone.grommet.4"
      },
      {
        "slug": "drone.grommet.5"
      },
      {
        "slug": "drone.grommet.6"
      },
      {
        "slug": "drone.grommet.7"
      },
      {
        "slug": "drone.motor_wire.0"
      },
      {
        "slug": "drone.motor_wire.1"
      },
      {
        "slug": "drone.motor_wire.2"
      },
      {
        "slug": "drone.motor_wire.3"
      }
    ]
  },
  {
    "slug": "droneaid.18",
    "symbols": [
      {
        "slug": "step"
      },
      {
        "slug": "tool.hex_5_5"
      }
    ],
    "trait": {
      "ANNOTATED": {
        "notes": [
          {
            "symbols": [
              "note.warning",
              "warn.orientation"
            ],
            "text": "Arrow must be pointing to the front (camera side)."
          },
          {
            "symbols": [
              "note.warning",
              "warn.tight"
            ],
            "text": "Don’t overtighten it, don’t keep it too loose."
          }
        ]
      },
      "ASSEMBLED": {
        "placements": [
          {
            "active": true,
            "literal": "drone.fc.0"
          },
          {
            "active": true,
            "literal": "drone.locknut_m3.0"
          },
          {
            "active": true,
            "literal": "drone.locknut_m3.1"
          },
          {
            "active": true,
            "literal": "drone.locknut_m3.2"
          },
          {
            "active": true,
            "literal": "drone.locknut_m3.3"
          }
        ]
      },
      "INSTRUCTED": {
        "images": [
          "manual/61bb4ea1f766.webp",
          "manual/3715301b424e.webp",
          "manual/28beb3d06ae4.webp"
        ],
        "lines": [
          {
            "text": "Get the metal locknuts from the stack package; nutdriver Hex 5.5."
          },
          {
            "text": "On top of the ESC, place the FC as in the photo."
          },
          {
            "text": "Secure the FC and ESC in place with the four metal locknuts that come with the stack."
          },
          {
            "text": "Tighten the stack so that it stands straight, but leave enough flexibility for the silicone to compress and absorb vibrations."
          },
          {
            "text": "The locknuts must be on the level with nuts."
          }
        ]
      },
      "LABELED": {
        "description": "Stack (FC & ESC). Manual p22.",
        "name": "The FC and the locknuts"
      },
      "STAGED": {
        "camera": {
          "position": [
            0.605,
            0.18,
            0.603
          ],
          "target": [
            0.425,
            0.02,
            0.4227
          ]
        },
        "ghost": true
      }
    },
    "traits": [
      "LABELED",
      "ASSEMBLED",
      "INSTRUCTED",
      "ANNOTATED",
      "STAGED"
    ],
    "uses": [
      {
        "slug": "drone.fc.0"
      },
      {
        "slug": "drone.locknut_m3.0"
      },
      {
        "slug": "drone.locknut_m3.1"
      },
      {
        "slug": "drone.locknut_m3.2"
      },
      {
        "slug": "drone.locknut_m3.3"
      }
    ]
  },
  {
    "slug": "droneaid.19",
    "symbols": [
      {
        "slug": "step"
      },
      {
        "slug": "tool.tweezers"
      }
    ],
    "trait": {
      "ANNOTATED": {
        "notes": [
          {
            "symbols": [
              "note.warning",
              "warn.orientation"
            ],
            "text": "Pay attention to cable orientation. Don’t push it too hard."
          },
          {
            "symbols": [
              "note.tip"
            ],
            "text": "Use tweezers if necessary."
          }
        ]
      },
      "ASSEMBLED": {
        "placements": [
          {
            "active": true,
            "literal": "drone.cable_esc_fc.0"
          }
        ]
      },
      "INSTRUCTED": {
        "images": [
          "manual/48bc8ecb5fc2.webp",
          "manual/67c1f4a8fc76.webp"
        ],
        "lines": [
          {
            "text": "Check that all the bolts on the bottom of the board are tightened."
          },
          {
            "text": "Connect the 8-pin cable between the ESC and the FC."
          }
        ]
      },
      "LABELED": {
        "description": "Stack (FC & ESC). Manual p23.",
        "name": "ESC to FC"
      },
      "STAGED": {
        "camera": {
          "position": [
            0.605,
            0.18,
            0.603
          ],
          "target": [
            0.425,
            0.02,
            0.4227
          ]
        },
        "ghost": true
      }
    },
    "traits": [
      "LABELED",
      "ASSEMBLED",
      "INSTRUCTED",
      "ANNOTATED",
      "STAGED"
    ],
    "uses": [
      {
        "slug": "drone.cable_esc_fc.0"
      }
    ]
  },
  {
    "slug": "droneaid.20",
    "symbols": [
      {
        "slug": "step"
      }
    ],
    "trait": {
      "ANNOTATED": {
        "notes": [
          {
            "symbols": [
              "note.warning",
              "warn.wires"
            ],
            "text": "Pay attention to the colors of the wires. The cable has a different color pattern on each end."
          },
          {
            "symbols": [
              "note.warning",
              "warn.wires"
            ],
            "text": "Choose the correct connector. Twist the cable. If you cannot do it easily, you can unscrew the FC, connect the cable, and then screw the FC back in place."
          }
        ]
      },
      "ASSEMBLED": {
        "placements": [
          {
            "active": true,
            "literal": "drone.cable_vtx_fc.0"
          }
        ]
      },
      "INSTRUCTED": {
        "images": [
          "manual/4624c1d36d16.webp",
          "manual/a6c635a1aa35.webp",
          "manual/5903ea959f64.webp",
          "manual/2b756140cc89.webp"
        ],
        "lines": [
          {
            "text": "Components: pigtail for antenna, VTX, cable for connecting VTX to FC, zip-ties 2x, thermo adhesive."
          },
          {
            "text": "Connect the cable to the VTX."
          },
          {
            "text": "Connect the VTX cable to the FC."
          }
        ]
      },
      "LABELED": {
        "description": "Video Transmitter (VTX). Manual p24–25.",
        "name": "The VTX cable"
      },
      "STAGED": {
        "camera": {
          "position": [
            0.186,
            0.136,
            0.603
          ],
          "target": [
            0.336,
            0.016,
            0.4227
          ]
        },
        "ghost": true
      }
    },
    "traits": [
      "LABELED",
      "ASSEMBLED",
      "INSTRUCTED",
      "ANNOTATED",
      "STAGED"
    ],
    "uses": [
      {
        "slug": "drone.cable_vtx_fc.0"
      }
    ]
  },
  {
    "slug": "droneaid.21",
    "symbols": [
      {
        "slug": "step"
      }
    ],
    "trait": {
      "ANNOTATED": {
        "notes": [
          {
            "symbols": [
              "note.warning",
              "warn.force"
            ],
            "text": "Be careful when applying power to the pigtail while pushing it to the VTX."
          },
          {
            "symbols": [
              "note.warning",
              "warn.orientation"
            ],
            "text": "Position the cable to look upwards."
          },
          {
            "symbols": [
              "note.warning"
            ],
            "text": "Don’t use the metal washer (just the metal ring and nut)."
          },
          {
            "symbols": [
              "note.warning",
              "warn.force"
            ],
            "text": "Be careful with the pigtail's cable, don’t bend it too much."
          },
          {
            "symbols": [
              "note.warning",
              "warn.orientation"
            ],
            "text": "Pay attention to the mount position. The pigtail should look upward."
          }
        ]
      },
      "ASSEMBLED": {
        "placements": [
          {
            "active": true,
            "literal": "drone.vtx_pigtail.0"
          }
        ]
      },
      "INSTRUCTED": {
        "images": [
          "manual/566398e722b7.webp",
          "manual/58a508f67ff1.webp",
          "manual/1ee92bbc15f0.webp",
          "manual/22cf30416323.webp",
          "manual/e9af656dabb7.webp",
          "manual/e287cee94df7.webp"
        ],
        "lines": [
          {
            "text": "Connect the pigtail to the VTX until you hear a click."
          },
          {
            "text": "Install the pigtail into the 3D printed antenna mount: remove the 3D printed antenna mount from the frame, remove the nut from the pigtail, insert the pigtail from the underside in the 3D printed mount, fix the pigtail in place using the nut from the top, tighten the nut."
          },
          {
            "text": "Insert the 3D print back into the frame."
          }
        ]
      },
      "LABELED": {
        "description": "Video Transmitter (VTX). Manual p25–27.",
        "name": "The pigtail through the antenna mount"
      },
      "STAGED": {
        "camera": {
          "position": [
            0.186,
            0.136,
            0.603
          ],
          "target": [
            0.336,
            0.016,
            0.4227
          ]
        },
        "ghost": true
      }
    },
    "traits": [
      "LABELED",
      "ASSEMBLED",
      "INSTRUCTED",
      "ANNOTATED",
      "STAGED"
    ],
    "uses": [
      {
        "slug": "drone.vtx_pigtail.0"
      }
    ]
  },
  {
    "slug": "droneaid.22",
    "symbols": [
      {
        "slug": "step"
      },
      {
        "slug": "tool.wire_cutters"
      }
    ],
    "trait": {
      "ANNOTATED": {
        "notes": [
          {
            "symbols": [
              "note.warning",
              "warn.orientation"
            ],
            "text": "Position the zip-tie the way it’ll not overlap with the button, pushing it."
          }
        ]
      },
      "ASSEMBLED": {
        "placements": [
          {
            "active": true,
            "literal": "drone.vtx.0"
          },
          {
            "active": true,
            "literal": "drone.thermo_adhesive.0"
          },
          {
            "active": true,
            "literal": "drone.zip_tie.0"
          },
          {
            "active": true,
            "literal": "drone.zip_tie.1"
          }
        ]
      },
      "INSTRUCTED": {
        "images": [
          "manual/cdb1180092b5.webp",
          "manual/b1fb02f8001b.webp",
          "manual/7344e45b9c49.webp",
          "manual/f08765f01a12.webp"
        ],
        "lines": [
          {
            "text": "Mount the VTX to the frame."
          },
          {
            "text": "Use thermo adhesive to attach the VTX to the frame. Remove the blue plastic."
          },
          {
            "text": "Use 2 zip-ties to lock the VTX through holes in the frame."
          }
        ]
      },
      "LABELED": {
        "description": "Video Transmitter (VTX). Manual p27.",
        "name": "Mount the VTX"
      },
      "STAGED": {
        "camera": {
          "position": [
            0.186,
            0.136,
            0.603
          ],
          "target": [
            0.336,
            0.016,
            0.4227
          ]
        },
        "ghost": true
      }
    },
    "traits": [
      "LABELED",
      "ASSEMBLED",
      "INSTRUCTED",
      "ANNOTATED",
      "STAGED"
    ],
    "uses": [
      {
        "slug": "drone.thermo_adhesive.0"
      },
      {
        "slug": "drone.vtx.0"
      },
      {
        "slug": "drone.zip_tie.0"
      },
      {
        "slug": "drone.zip_tie.1"
      }
    ]
  },
  {
    "slug": "droneaid.23",
    "symbols": [
      {
        "slug": "step"
      }
    ],
    "trait": {
      "ANNOTATED": {
        "notes": []
      },
      "ASSEMBLED": {
        "placements": [
          {
            "active": true,
            "literal": "drone.antenna_rx.1"
          }
        ]
      },
      "INSTRUCTED": {
        "images": [
          "manual/93b1522dc4da.webp",
          "manual/67dcdd9689de.webp"
        ],
        "lines": [
          {
            "text": "Components: RX cable (with connectors on both sides), heat shrink, RX, RX antennas 2x."
          },
          {
            "text": "Insert the first antenna into the tail."
          },
          {
            "text": "Insert one end, then carefully bend the antenna and insert it through the holes in the tail, as shown in the picture."
          },
          {
            "text": "Make sure that the wires from the antenna go between the standoffs and are not hanging outside."
          }
        ]
      },
      "LABELED": {
        "description": "Receiver Installation. Manual p28.",
        "name": "The first RX antenna into the tail"
      },
      "STAGED": {
        "camera": {
          "position": [
            0.12,
            0.165,
            0.583
          ],
          "target": [
            0.3,
            0.025,
            0.4227
          ]
        },
        "ghost": true
      }
    },
    "traits": [
      "LABELED",
      "ASSEMBLED",
      "INSTRUCTED",
      "ANNOTATED",
      "STAGED"
    ],
    "uses": [
      {
        "slug": "drone.antenna_rx.1"
      }
    ]
  },
  {
    "slug": "droneaid.24",
    "symbols": [
      {
        "slug": "step"
      }
    ],
    "trait": {
      "ANNOTATED": {
        "notes": [
          {
            "symbols": [
              "note.warning",
              "warn.wires"
            ],
            "text": "Pay attention to the colors of the wires."
          },
          {
            "symbols": [
              "note.warning",
              "warn.force"
            ],
            "text": "Be careful with the pressing force. You should feel a click."
          }
        ]
      },
      "ASSEMBLED": {
        "placements": [
          {
            "active": true,
            "literal": "drone.antenna_rx.0"
          },
          {
            "active": true,
            "literal": "drone.tail_mount.0"
          },
          {
            "active": true,
            "literal": "drone.rx.0"
          },
          {
            "active": true,
            "literal": "drone.cable_rx.0"
          },
          {
            "active": true,
            "literal": "drone.heat_shrink.0"
          }
        ]
      },
      "INSTRUCTED": {
        "images": [
          "manual/8def5dd5ab3c.webp",
          "manual/5af94b596b4b.webp",
          "manual/ad525134bf38.webp"
        ],
        "lines": [
          {
            "text": "Put the second antenna into the second 3D-printed tail part. This 3D-printed part is not mounted to the frame at the moment."
          },
          {
            "text": "Insert one end, then carefully bend the antenna and insert it through the holes in the tail, as shown in the picture."
          },
          {
            "text": "Connect the cable to the RX."
          },
          {
            "text": "Connect the antennas to the RX and slide the heat shrink tubing onto the RX cable."
          },
          {
            "text": "Move the heat shrink to cover the plate. Make sure the heat shrink covers all the contacts."
          }
        ]
      },
      "LABELED": {
        "description": "Receiver Installation. Manual p29.",
        "name": "The second antenna, the RX and its cable"
      },
      "STAGED": {
        "camera": {
          "position": [
            0.12,
            0.165,
            0.583
          ],
          "target": [
            0.3,
            0.025,
            0.4227
          ]
        },
        "ghost": true
      }
    },
    "traits": [
      "LABELED",
      "ASSEMBLED",
      "INSTRUCTED",
      "ANNOTATED",
      "STAGED"
    ],
    "uses": [
      {
        "slug": "drone.antenna_rx.0"
      },
      {
        "slug": "drone.cable_rx.0"
      },
      {
        "slug": "drone.heat_shrink.0"
      },
      {
        "slug": "drone.rx.0"
      },
      {
        "slug": "drone.tail_mount.0"
      }
    ]
  },
  {
    "slug": "droneaid.25",
    "symbols": [
      {
        "slug": "step"
      },
      {
        "slug": "tool.hex_2_0"
      }
    ],
    "trait": {
      "ANNOTATED": {
        "notes": [
          {
            "symbols": [
              "note.warning",
              "warn.orientation"
            ],
            "text": "The camera should be in the most forward position."
          }
        ]
      },
      "ASSEMBLED": {
        "placements": [
          {
            "active": true,
            "literal": "drone.bolt_m2_4.0"
          },
          {
            "active": true,
            "literal": "drone.bolt_m2_4.1"
          }
        ]
      },
      "INSTRUCTED": {
        "images": [
          "manual/d2eaa1b4b11f.webp",
          "manual/2f48643213bd.webp"
        ],
        "lines": [
          {
            "text": "Components: camera, cable from the FC box, M2 4mm bolts 2x."
          },
          {
            "text": "Insert the bolts into the second holes, closer to the front of the drone."
          }
        ]
      },
      "LABELED": {
        "description": "Install Camera. Manual p30.",
        "name": "The camera bolts"
      },
      "STAGED": {
        "camera": {
          "position": [
            0.732,
            0.124,
            0.582
          ],
          "target": [
            0.552,
            0.024,
            0.4221
          ]
        },
        "ghost": true
      }
    },
    "traits": [
      "LABELED",
      "ASSEMBLED",
      "INSTRUCTED",
      "ANNOTATED",
      "STAGED"
    ],
    "uses": [
      {
        "slug": "drone.bolt_m2_4.0"
      },
      {
        "slug": "drone.bolt_m2_4.1"
      }
    ]
  },
  {
    "slug": "droneaid.26",
    "symbols": [
      {
        "slug": "step"
      },
      {
        "slug": "tool.hex_2_0"
      }
    ],
    "trait": {
      "ANNOTATED": {
        "notes": []
      },
      "ASSEMBLED": {
        "placements": [
          {
            "active": true,
            "literal": "drone.camera.0"
          }
        ]
      },
      "INSTRUCTED": {
        "images": [
          "manual/3e4aca7f9e17.webp"
        ],
        "lines": [
          {
            "text": "Mount the camera."
          },
          {
            "text": "The cable connector must be on the top side of the camera."
          }
        ]
      },
      "LABELED": {
        "description": "Install Camera. Manual p31.",
        "name": "Mount the camera"
      },
      "STAGED": {
        "camera": {
          "position": [
            0.732,
            0.124,
            0.582
          ],
          "target": [
            0.552,
            0.024,
            0.4221
          ]
        },
        "ghost": true
      }
    },
    "traits": [
      "LABELED",
      "ASSEMBLED",
      "INSTRUCTED",
      "ANNOTATED",
      "STAGED"
    ],
    "uses": [
      {
        "slug": "drone.camera.0"
      }
    ]
  },
  {
    "slug": "droneaid.27",
    "symbols": [
      {
        "slug": "step"
      }
    ],
    "trait": {
      "ANNOTATED": {
        "notes": []
      },
      "ASSEMBLED": {
        "placements": [
          {
            "active": true,
            "literal": "drone.cable_camera.0"
          }
        ]
      },
      "INSTRUCTED": {
        "images": [
          "manual/cbdb345e4c64.webp",
          "manual/a8f94c70d4f1.webp"
        ],
        "lines": [
          {
            "text": "Twist the cable and connect it to the flight controller."
          }
        ]
      },
      "LABELED": {
        "description": "Install Camera. Manual p32.",
        "name": "The camera cable"
      },
      "STAGED": {
        "camera": {
          "position": [
            0.732,
            0.124,
            0.582
          ],
          "target": [
            0.552,
            0.024,
            0.4221
          ]
        },
        "ghost": true
      }
    },
    "traits": [
      "LABELED",
      "ASSEMBLED",
      "INSTRUCTED",
      "ANNOTATED",
      "STAGED"
    ],
    "uses": [
      {
        "slug": "drone.cable_camera.0"
      }
    ]
  },
  {
    "slug": "droneaid.28",
    "symbols": [
      {
        "slug": "step"
      },
      {
        "slug": "tool.hex_2_0"
      },
      {
        "slug": "tool.wire_cutters"
      }
    ],
    "trait": {
      "ANNOTATED": {
        "notes": [
          {
            "symbols": [
              "note.warning",
              "warn.wires"
            ],
            "text": "Be careful not to damage wires while screwing the top plate."
          },
          {
            "symbols": [
              "note.warning",
              "warn.wires"
            ],
            "text": "Let the power wires go on the side of the drone (not through the top plate)."
          },
          {
            "symbols": [
              "note.warning",
              "warn.wires"
            ],
            "text": "Lock the power cable with a zip tie from the right side when looking at the front of the drone."
          },
          {
            "symbols": [
              "note.warning",
              "warn.length"
            ],
            "text": "For the dual-antenna (diversity) version you will need one 12mm bolt."
          }
        ]
      },
      "ASSEMBLED": {
        "placements": [
          {
            "active": true,
            "literal": "drone.frame_top.0"
          },
          {
            "active": true,
            "literal": "drone.bolt_m3_8.4"
          },
          {
            "active": true,
            "literal": "drone.bolt_m3_8.5"
          },
          {
            "active": true,
            "literal": "drone.bolt_m3_8.6"
          },
          {
            "active": true,
            "literal": "drone.bolt_m3_8.7"
          },
          {
            "active": true,
            "literal": "drone.bolt_m3_8.8"
          },
          {
            "active": true,
            "literal": "drone.bolt_m3_8.9"
          },
          {
            "active": true,
            "literal": "drone.bolt_m3_8.10"
          },
          {
            "active": true,
            "literal": "drone.bolt_m3_8.11"
          },
          {
            "active": true,
            "literal": "drone.zip_tie.2"
          }
        ]
      },
      "INSTRUCTED": {
        "images": [
          "manual/ec21d11de837.webp",
          "manual/a3c7650ae1f7.webp"
        ],
        "lines": [
          {
            "text": "Components: 8mm bolts 8x, zip-ties."
          },
          {
            "text": "Place the plate on top."
          },
          {
            "text": "Screw in the 8mm bolts to secure it."
          }
        ]
      },
      "LABELED": {
        "description": "Top Plate installation. Manual p33.",
        "name": "The top plate"
      },
      "STAGED": {
        "camera": {
          "position": [
            0.641,
            0.34,
            0.643
          ],
          "target": [
            0.4209,
            0.02,
            0.4226
          ]
        },
        "ghost": true
      }
    },
    "traits": [
      "LABELED",
      "ASSEMBLED",
      "INSTRUCTED",
      "ANNOTATED",
      "STAGED"
    ],
    "uses": [
      {
        "slug": "drone.bolt_m3_8.10"
      },
      {
        "slug": "drone.bolt_m3_8.11"
      },
      {
        "slug": "drone.bolt_m3_8.4"
      },
      {
        "slug": "drone.bolt_m3_8.5"
      },
      {
        "slug": "drone.bolt_m3_8.6"
      },
      {
        "slug": "drone.bolt_m3_8.7"
      },
      {
        "slug": "drone.bolt_m3_8.8"
      },
      {
        "slug": "drone.bolt_m3_8.9"
      },
      {
        "slug": "drone.frame_top.0"
      },
      {
        "slug": "drone.zip_tie.2"
      }
    ]
  },
  {
    "slug": "droneaid.29",
    "symbols": [
      {
        "slug": "step"
      },
      {
        "slug": "tool.wire_cutters"
      }
    ],
    "trait": {
      "ANNOTATED": {
        "notes": [
          {
            "symbols": [
              "note.warning"
            ],
            "text": "Make sure there are no sharp edges left after cutting zip-ties."
          }
        ]
      },
      "ASSEMBLED": {
        "placements": [
          {
            "active": true,
            "literal": "drone.zip_tie.3"
          }
        ]
      },
      "INSTRUCTED": {
        "images": [
          "manual/ae36e9138dfc.webp"
        ],
        "lines": [
          {
            "text": "Mount the RX by zip-tying it to the top plate."
          },
          {
            "text": "The contacts of the antennas should look down (away from the top plate of the frame)."
          },
          {
            "text": "Cut off the excess tail of the zip tie."
          }
        ]
      },
      "LABELED": {
        "description": "Top Plate installation. Manual p34.",
        "name": "Zip-tie the RX"
      },
      "STAGED": {
        "camera": {
          "position": [
            0.641,
            0.34,
            0.643
          ],
          "target": [
            0.4209,
            0.02,
            0.4226
          ]
        },
        "ghost": true
      }
    },
    "traits": [
      "LABELED",
      "ASSEMBLED",
      "INSTRUCTED",
      "ANNOTATED",
      "STAGED"
    ],
    "uses": [
      {
        "slug": "drone.zip_tie.3"
      }
    ]
  },
  {
    "slug": "droneaid.30",
    "symbols": [
      {
        "slug": "step"
      },
      {
        "slug": "tool.marker"
      },
      {
        "slug": "tool.wire_cutters"
      }
    ],
    "trait": {
      "ANNOTATED": {
        "notes": []
      },
      "ASSEMBLED": {
        "placements": [
          {
            "active": true,
            "literal": "drone.battery_pad.0"
          },
          {
            "active": true,
            "literal": "drone.antenna_vtx.0"
          },
          {
            "active": true,
            "literal": "drone.zip_tie.4"
          },
          {
            "active": true,
            "literal": "drone.sticker_id.0"
          }
        ]
      },
      "INSTRUCTED": {
        "images": [
          "manual/b4d35a1c57cb.webp"
        ],
        "lines": [
          {
            "text": "Stick the battery pad onto the top plate. Remove the pre-cut pieces from the holes in the rubber pad. Remove the backing tape from the rubber pad to expose the self-adhesive side. Align the rubber pad with the holes in the top plate and fix the rubber pad in position."
          },
          {
            "text": "Attach the VTX antenna."
          },
          {
            "text": "Fix the second RX antenna by zip-tying it to the top plate. This should be done from the left side while looking at the front of the drone (opposite of the power wires side)."
          },
          {
            "text": "Add stickers with the drone ID to the top front side of the drone."
          },
          {
            "text": "Sign your drone! Ask mentors for white markers."
          }
        ]
      },
      "LABELED": {
        "description": "Top Plate installation. Manual p34.",
        "name": "Battery pad, VTX antenna, the second RX antenna, stickers"
      },
      "STAGED": {
        "camera": {
          "position": [
            0.641,
            0.34,
            0.643
          ],
          "target": [
            0.4209,
            0.02,
            0.4226
          ]
        },
        "ghost": true
      }
    },
    "traits": [
      "LABELED",
      "ASSEMBLED",
      "INSTRUCTED",
      "ANNOTATED",
      "STAGED"
    ],
    "uses": [
      {
        "slug": "drone.antenna_vtx.0"
      },
      {
        "slug": "drone.battery_pad.0"
      },
      {
        "slug": "drone.sticker_id.0"
      },
      {
        "slug": "drone.zip_tie.4"
      }
    ]
  },
  {
    "slug": "droneaid.31",
    "symbols": [
      {
        "slug": "step"
      },
      {
        "slug": "tool.hex_2_0"
      }
    ],
    "trait": {
      "ANNOTATED": {
        "notes": [
          {
            "symbols": [
              "note.warning",
              "warn.tight"
            ],
            "text": "Do not overtighten."
          }
        ]
      },
      "ASSEMBLED": {
        "placements": []
      },
      "INSTRUCTED": {
        "images": [],
        "lines": [
          {
            "text": "Check all bolts from all sides to make sure they are tightened properly. Do not overtighten them."
          },
          {
            "text": "Ensure all wiring stays inside the frame and doesn’t stick outside."
          },
          {
            "text": "Ensure the second RX antenna cable goes between standoffs at the upper part right under the top cover."
          }
        ]
      },
      "LABELED": {
        "description": "Checklist. Manual p35.",
        "name": "Bolts and wiring"
      },
      "STAGED": {
        "camera": {
          "position": [
            0.771,
            0.32,
            0.773
          ],
          "target": [
            0.4209,
            0.02,
            0.4226
          ]
        },
        "ghost": true
      }
    },
    "traits": [
      "LABELED",
      "ASSEMBLED",
      "INSTRUCTED",
      "ANNOTATED",
      "STAGED"
    ]
  },
  {
    "slug": "droneaid.32",
    "symbols": [
      {
        "slug": "step"
      },
      {
        "slug": "tool.hex_2_0"
      }
    ],
    "trait": {
      "ANNOTATED": {
        "notes": []
      },
      "ASSEMBLED": {
        "placements": []
      },
      "INSTRUCTED": {
        "images": [
          "manual/56a5be6e6b12.webp"
        ],
        "lines": [
          {
            "text": "Check the camera screws to make sure they are tight. The camera should move by hand, but with effort."
          },
          {
            "text": "When done, show your drone to your mentor for a check!"
          }
        ]
      },
      "LABELED": {
        "description": "Checklist. Manual p35.",
        "name": "Camera screws — show your mentor"
      },
      "STAGED": {
        "camera": {
          "position": [
            0.771,
            0.32,
            0.773
          ],
          "target": [
            0.4209,
            0.02,
            0.4226
          ]
        },
        "ghost": true
      }
    },
    "traits": [
      "LABELED",
      "ASSEMBLED",
      "INSTRUCTED",
      "ANNOTATED",
      "STAGED"
    ]
  },
  {
    "slug": "droneaid.33",
    "symbols": [
      {
        "slug": "step"
      }
    ],
    "trait": {
      "ANNOTATED": {
        "notes": [
          {
            "symbols": [
              "note.warning",
              "warn.magnet"
            ],
            "text": "Never fit propellers with a battery connected."
          },
          {
            "symbols": [
              "note.warning",
              "warn.orientation"
            ],
            "text": "Mind the rotation direction of each propeller."
          }
        ]
      },
      "ASSEMBLED": {
        "placements": [
          {
            "active": true,
            "literal": "drone.propeller.0"
          },
          {
            "active": true,
            "literal": "drone.propeller.1"
          },
          {
            "active": true,
            "literal": "drone.propeller.2"
          },
          {
            "active": true,
            "literal": "drone.propeller.3"
          }
        ]
      },
      "INSTRUCTED": {
        "images": [],
        "lines": [
          {
            "text": "Fit the four propellers onto the motors and thread the prop nuts down onto them."
          },
          {
            "text": "Each propeller turns the way its motor does — match the rotation marked on the blade to the motor's direction."
          }
        ]
      },
      "LABELED": {
        "description": "Checklist.",
        "name": "Propellers"
      },
      "STAGED": {
        "camera": {
          "position": [
            0.771,
            0.32,
            0.773
          ],
          "target": [
            0.4209,
            0.02,
            0.4226
          ]
        },
        "ghost": true
      }
    },
    "traits": [
      "LABELED",
      "ASSEMBLED",
      "INSTRUCTED",
      "ANNOTATED",
      "STAGED"
    ],
    "uses": [
      {
        "slug": "drone.propeller.0"
      },
      {
        "slug": "drone.propeller.1"
      },
      {
        "slug": "drone.propeller.2"
      },
      {
        "slug": "drone.propeller.3"
      }
    ]
  }
];
