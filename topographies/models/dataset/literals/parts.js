export default [
  {
    "slug": "antenna_cover",
    "symbols": [
      {
        "slug": "family.mount"
      },
      {
        "slug": "material.printed"
      },
      {
        "slug": "part"
      },
      {
        "slug": "source.print_stl"
      }
    ],
    "trait": {
      "COUNTED": {
        "qty": 4
      },
      "LABELED": {
        "name": "ELRS antenna cover (TPU)"
      },
      "MODELED": {
        "bbox": [
          0.03641,
          0.0238,
          0.01335
        ],
        "file": "parts/antenna_cover.glb",
        "tris": 7672
      },
      "SOURCED": {
        "file": "tail/TPU_elrs_ant_wide_closed.stl",
        "scale": 0.001
      }
    },
    "traits": [
      "LABELED",
      "SOURCED",
      "MODELED",
      "COUNTED"
    ]
  },
  {
    "slug": "antenna_mount",
    "symbols": [
      {
        "slug": "family.mount"
      },
      {
        "slug": "material.printed"
      },
      {
        "slug": "part"
      }
    ],
    "trait": {
      "COUNTED": {
        "qty": 1
      },
      "LABELED": {
        "description": "3D-printed rear mount for the VTX pigtail — the manual's [10]",
        "name": "Antenna mount"
      },
      "MODELED": {
        "bbox": [
          0.01862,
          0.01861,
          0.00988
        ],
        "file": "parts/antenna_mount.glb",
        "tris": 92
      },
      "SOURCED": {
        "file": "DRONEAID_model_latest.blend",
        "object": "AntennaFixture02",
        "scale": 0.05
      }
    },
    "traits": [
      "LABELED",
      "SOURCED",
      "MODELED",
      "COUNTED"
    ]
  },
  {
    "slug": "antenna_rx",
    "symbols": [
      {
        "slug": "family.antenna"
      },
      {
        "slug": "material.electronics"
      },
      {
        "slug": "part"
      }
    ],
    "trait": {
      "COUNTED": {
        "qty": 2
      },
      "LABELED": {
        "description": "ELRS receiver antenna — two in the kit",
        "name": "RX antenna"
      },
      "MODELED": {
        "bbox": [
          0.00263,
          0.05998,
          0.00263
        ],
        "file": "parts/antenna_rx.glb",
        "tris": 380
      },
      "SOURCED": {
        "file": "DRONEAID_model_latest.blend",
        "object": "Antenna.00",
        "scale": 0.05
      }
    },
    "traits": [
      "LABELED",
      "SOURCED",
      "MODELED",
      "COUNTED"
    ]
  },
  {
    "slug": "antenna_standoff",
    "symbols": [
      {
        "slug": "family.mount"
      },
      {
        "slug": "material.printed"
      },
      {
        "slug": "part"
      },
      {
        "slug": "source.print_stl"
      }
    ],
    "trait": {
      "COUNTED": {
        "qty": 1
      },
      "LABELED": {
        "name": "Antenna standoff"
      },
      "MODELED": {
        "bbox": [
          0.03017,
          0.035,
          0.02675
        ],
        "file": "parts/antenna_standoff.glb",
        "tris": 5676
      },
      "SOURCED": {
        "file": "tail/standoff/standoff_v2.stl",
        "scale": 0.001
      }
    },
    "traits": [
      "LABELED",
      "SOURCED",
      "MODELED",
      "COUNTED"
    ]
  },
  {
    "slug": "antenna_vtx",
    "symbols": [
      {
        "slug": "family.antenna"
      },
      {
        "slug": "material.electronics"
      },
      {
        "slug": "part"
      }
    ],
    "trait": {
      "COUNTED": {
        "qty": 1
      },
      "LABELED": {
        "description": "On the pigtail, through the rear antenna mount",
        "name": "VTX antenna"
      },
      "MODELED": {
        "bbox": [
          0.01157,
          0.06718,
          0.01157
        ],
        "file": "parts/antenna_vtx.glb",
        "tris": 444
      },
      "SOURCED": {
        "file": "DRONEAID_model_latest.blend",
        "object": "Antenna.02",
        "scale": 0.05
      }
    },
    "traits": [
      "LABELED",
      "SOURCED",
      "MODELED",
      "COUNTED"
    ]
  },
  {
    "slug": "battery_pad",
    "symbols": [
      {
        "slug": "family.pad"
      },
      {
        "slug": "material.soft_goods"
      },
      {
        "slug": "part"
      },
      {
        "slug": "source.parametric"
      }
    ],
    "trait": {
      "COUNTED": {
        "qty": 1
      },
      "LABELED": {
        "name": "Battery pad"
      },
      "PARAMETRIC": {
        "generator": "solid.box",
        "params": {
          "x": 100,
          "y": 3,
          "z": 40
        }
      }
    },
    "traits": [
      "LABELED",
      "PARAMETRIC",
      "COUNTED"
    ]
  },
  {
    "slug": "battery_strap",
    "symbols": [
      {
        "slug": "family.strap"
      },
      {
        "slug": "material.soft_goods"
      },
      {
        "slug": "part"
      }
    ],
    "trait": {
      "COUNTED": {
        "qty": 2
      },
      "LABELED": {
        "name": "Battery strap"
      }
    },
    "traits": [
      "LABELED",
      "COUNTED"
    ]
  },
  {
    "slug": "bolt_m2_4",
    "symbols": [
      {
        "slug": "family.bolt.m2"
      },
      {
        "slug": "material.fastener"
      },
      {
        "slug": "part"
      },
      {
        "slug": "source.parametric"
      }
    ],
    "trait": {
      "COUNTED": {
        "qty": 2
      },
      "LABELED": {
        "name": "Bolt M2 × 4, camera"
      },
      "PARAMETRIC": {
        "generator": "fastener.bolt",
        "params": {
          "length": 4,
          "thread": "M2"
        }
      }
    },
    "traits": [
      "LABELED",
      "PARAMETRIC",
      "COUNTED"
    ]
  },
  {
    "slug": "bolt_m3_10",
    "symbols": [
      {
        "slug": "family.bolt.m3"
      },
      {
        "slug": "material.fastener"
      },
      {
        "slug": "part"
      },
      {
        "slug": "source.parametric"
      }
    ],
    "trait": {
      "COUNTED": {
        "qty": 16
      },
      "LABELED": {
        "name": "Bolt M3 × 10, motor"
      },
      "PARAMETRIC": {
        "generator": "fastener.bolt",
        "params": {
          "length": 10,
          "thread": "M3"
        }
      }
    },
    "traits": [
      "LABELED",
      "PARAMETRIC",
      "COUNTED"
    ]
  },
  {
    "slug": "bolt_m3_12",
    "symbols": [
      {
        "slug": "family.bolt.m3"
      },
      {
        "slug": "material.fastener"
      },
      {
        "slug": "part"
      },
      {
        "slug": "source.parametric"
      }
    ],
    "trait": {
      "COUNTED": {
        "qty": 1
      },
      "LABELED": {
        "name": "Bolt M3 × 12, RX antenna"
      },
      "PARAMETRIC": {
        "generator": "fastener.bolt",
        "params": {
          "length": 12,
          "thread": "M3"
        }
      }
    },
    "traits": [
      "LABELED",
      "PARAMETRIC",
      "COUNTED"
    ]
  },
  {
    "slug": "bolt_m3_16",
    "symbols": [
      {
        "slug": "family.bolt.m3"
      },
      {
        "slug": "material.fastener"
      },
      {
        "slug": "part"
      },
      {
        "slug": "source.parametric"
      }
    ],
    "trait": {
      "COUNTED": {
        "qty": 6
      },
      "LABELED": {
        "name": "Bolt M3 × 16, short"
      },
      "PARAMETRIC": {
        "generator": "fastener.bolt",
        "params": {
          "length": 16,
          "thread": "M3"
        }
      }
    },
    "traits": [
      "LABELED",
      "PARAMETRIC",
      "COUNTED"
    ]
  },
  {
    "slug": "bolt_m3_18",
    "symbols": [
      {
        "slug": "family.bolt.m3"
      },
      {
        "slug": "material.fastener"
      },
      {
        "slug": "part"
      },
      {
        "slug": "source.parametric"
      }
    ],
    "trait": {
      "COUNTED": {
        "qty": 4
      },
      "LABELED": {
        "name": "Bolt M3 × 18, medium"
      },
      "PARAMETRIC": {
        "generator": "fastener.bolt",
        "params": {
          "length": 18,
          "thread": "M3"
        }
      }
    },
    "traits": [
      "LABELED",
      "PARAMETRIC",
      "COUNTED"
    ]
  },
  {
    "slug": "bolt_m3_28",
    "symbols": [
      {
        "slug": "family.bolt.m3"
      },
      {
        "slug": "material.fastener"
      },
      {
        "slug": "part"
      },
      {
        "slug": "source.parametric"
      }
    ],
    "trait": {
      "COUNTED": {
        "qty": 4
      },
      "LABELED": {
        "name": "Bolt M3 × 28, long"
      },
      "PARAMETRIC": {
        "generator": "fastener.bolt",
        "params": {
          "length": 28,
          "thread": "M3"
        }
      }
    },
    "traits": [
      "LABELED",
      "PARAMETRIC",
      "COUNTED"
    ]
  },
  {
    "slug": "bolt_m3_30",
    "symbols": [
      {
        "slug": "family.bolt.m3"
      },
      {
        "slug": "material.fastener"
      },
      {
        "slug": "part"
      },
      {
        "slug": "source.parametric"
      }
    ],
    "trait": {
      "COUNTED": {
        "qty": 4
      },
      "LABELED": {
        "name": "Bolt M3 × 30, stack"
      },
      "PARAMETRIC": {
        "generator": "fastener.bolt",
        "params": {
          "length": 30,
          "thread": "M3"
        }
      }
    },
    "traits": [
      "LABELED",
      "PARAMETRIC",
      "COUNTED"
    ]
  },
  {
    "slug": "bolt_m3_8",
    "symbols": [
      {
        "slug": "family.bolt.m3"
      },
      {
        "slug": "material.fastener"
      },
      {
        "slug": "part"
      },
      {
        "slug": "source.parametric"
      }
    ],
    "trait": {
      "COUNTED": {
        "qty": 16
      },
      "LABELED": {
        "name": "Bolt M3 × 8, top plate"
      },
      "PARAMETRIC": {
        "generator": "fastener.bolt",
        "params": {
          "length": 8,
          "thread": "M3"
        }
      }
    },
    "traits": [
      "LABELED",
      "PARAMETRIC",
      "COUNTED"
    ]
  },
  {
    "slug": "cable_camera",
    "symbols": [
      {
        "slug": "family.cable"
      },
      {
        "slug": "material.electronics"
      },
      {
        "slug": "part"
      },
      {
        "slug": "source.parametric"
      }
    ],
    "trait": {
      "COUNTED": {
        "qty": 1
      },
      "LABELED": {
        "name": "Camera cable"
      },
      "PARAMETRIC": {
        "generator": "cable.route",
        "params": {
          "diameter": 2.4,
          "route": [
            [
              0.44014,
              0.02173,
              0.42268
            ],
            [
              0.4938,
              0.02819,
              0.42241
            ],
            [
              0.54746,
              0.02419,
              0.42213
            ]
          ]
        }
      }
    },
    "traits": [
      "LABELED",
      "PARAMETRIC",
      "COUNTED"
    ]
  },
  {
    "slug": "cable_esc_fc",
    "symbols": [
      {
        "slug": "family.cable"
      },
      {
        "slug": "material.electronics"
      },
      {
        "slug": "part"
      },
      {
        "slug": "source.parametric"
      }
    ],
    "trait": {
      "COUNTED": {
        "qty": 1
      },
      "LABELED": {
        "name": "ESC–FC cable, 8-pin"
      },
      "PARAMETRIC": {
        "generator": "cable.route",
        "params": {
          "diameter": 2.4,
          "route": [
            [
              0.44014,
              0.01493,
              0.42268
            ],
            [
              0.44414,
              0.01786,
              0.42268
            ],
            [
              0.44014,
              0.02079,
              0.42268
            ]
          ]
        }
      }
    },
    "traits": [
      "LABELED",
      "PARAMETRIC",
      "COUNTED"
    ]
  },
  {
    "slug": "cable_rx",
    "symbols": [
      {
        "slug": "family.cable"
      },
      {
        "slug": "material.electronics"
      },
      {
        "slug": "part"
      },
      {
        "slug": "source.parametric"
      }
    ],
    "trait": {
      "COUNTED": {
        "qty": 1
      },
      "LABELED": {
        "name": "RX cable"
      },
      "PARAMETRIC": {
        "generator": "cable.route",
        "params": {
          "diameter": 2.4,
          "route": [
            [
              0.40984,
              0.02173,
              0.42268
            ],
            [
              0.36006,
              0.02748,
              0.42268
            ],
            [
              0.31028,
              0.03322,
              0.42262
            ]
          ]
        }
      }
    },
    "traits": [
      "LABELED",
      "PARAMETRIC",
      "COUNTED"
    ]
  },
  {
    "slug": "cable_vtx_fc",
    "symbols": [
      {
        "slug": "family.cable"
      },
      {
        "slug": "material.electronics"
      },
      {
        "slug": "part"
      },
      {
        "slug": "source.parametric"
      }
    ],
    "trait": {
      "COUNTED": {
        "qty": 1
      },
      "LABELED": {
        "name": "VTX–FC cable"
      },
      "PARAMETRIC": {
        "generator": "cable.route",
        "params": {
          "diameter": 2.4,
          "route": [
            [
              0.40984,
              0.02173,
              0.42268
            ],
            [
              0.373,
              0.02473,
              0.42268
            ],
            [
              0.33616,
              0.02118,
              0.42268
            ]
          ]
        }
      }
    },
    "traits": [
      "LABELED",
      "PARAMETRIC",
      "COUNTED"
    ]
  },
  {
    "slug": "cam_holder",
    "symbols": [
      {
        "slug": "family.mount"
      },
      {
        "slug": "material.printed"
      },
      {
        "slug": "part"
      }
    ],
    "trait": {
      "COUNTED": {
        "qty": 2
      },
      "LABELED": {
        "description": "3D-printed — the manual's [9]",
        "name": "Camera mount"
      },
      "MODELED": {
        "bbox": [
          0.01733,
          0.0274,
          0.01178
        ],
        "file": "parts/cam_holder.glb",
        "tris": 104
      },
      "SOURCED": {
        "file": "DRONEAID_model_latest.blend",
        "object": "CamHolder1",
        "scale": 0.05
      }
    },
    "traits": [
      "LABELED",
      "SOURCED",
      "MODELED",
      "COUNTED"
    ]
  },
  {
    "slug": "camera",
    "symbols": [
      {
        "slug": "family.camera"
      },
      {
        "slug": "material.electronics"
      },
      {
        "slug": "part"
      }
    ],
    "trait": {
      "COUNTED": {
        "qty": 1
      },
      "LABELED": {
        "description": "Between the two camera mounts, connector up",
        "name": "FPV camera"
      },
      "MODELED": {
        "bbox": [
          0.0244,
          0.01906,
          0.01906
        ],
        "file": "parts/camera.glb",
        "tris": 440
      },
      "SOURCED": {
        "file": "DRONEAID_model_latest.blend",
        "object": "Camera",
        "scale": 0.05
      }
    },
    "traits": [
      "LABELED",
      "SOURCED",
      "MODELED",
      "COUNTED"
    ]
  },
  {
    "slug": "drive",
    "symbols": [
      {
        "slug": "part"
      }
    ],
    "trait": {
      "LABELED": {
        "description": "Motors, their bolts and wires, propellers and prop nuts",
        "name": "Drive"
      }
    },
    "traits": [
      "LABELED"
    ]
  },
  {
    "slug": "esc",
    "symbols": [
      {
        "slug": "family.esc"
      },
      {
        "slug": "material.electronics"
      },
      {
        "slug": "part"
      }
    ],
    "trait": {
      "COUNTED": {
        "qty": 1
      },
      "LABELED": {
        "description": "The electronic speed controller board, under the FC",
        "name": "ESC"
      },
      "MODELED": {
        "bbox": [
          0.0303,
          0.00094,
          0.0303
        ],
        "file": "parts/esc.glb",
        "tris": 92
      },
      "SOURCED": {
        "file": "DRONEAID_model_latest.blend",
        "object": "FlightController00",
        "scale": 0.05
      }
    },
    "traits": [
      "LABELED",
      "SOURCED",
      "MODELED",
      "COUNTED"
    ]
  },
  {
    "slug": "fc",
    "symbols": [
      {
        "slug": "family.fc"
      },
      {
        "slug": "material.electronics"
      },
      {
        "slug": "part"
      }
    ],
    "trait": {
      "COUNTED": {
        "qty": 1
      },
      "LABELED": {
        "description": "The FC board, arrow to the front",
        "name": "Flight controller"
      },
      "MODELED": {
        "bbox": [
          0.0303,
          0.00094,
          0.0303
        ],
        "file": "parts/fc.glb",
        "tris": 92
      },
      "SOURCED": {
        "file": "DRONEAID_model_latest.blend",
        "object": "FlightController01",
        "scale": 0.05
      }
    },
    "traits": [
      "LABELED",
      "SOURCED",
      "MODELED",
      "COUNTED"
    ]
  },
  {
    "slug": "frame",
    "symbols": [
      {
        "slug": "part"
      }
    ],
    "trait": {
      "LABELED": {
        "description": "Plates, arms and stands with their bolts — the manual's Frame Assembly",
        "name": "Frame"
      }
    },
    "traits": [
      "LABELED"
    ]
  },
  {
    "slug": "frame_bottom",
    "symbols": [
      {
        "slug": "family.plate"
      },
      {
        "slug": "material.carbon"
      },
      {
        "slug": "part"
      }
    ],
    "trait": {
      "COUNTED": {
        "qty": 1
      },
      "LABELED": {
        "description": "Carbon, the middle plate over the arms — the manual's [3]",
        "name": "Arm sandwich plate"
      },
      "MODELED": {
        "bbox": [
          0.28225,
          0.002,
          0.09699
        ],
        "file": "parts/frame_bottom.glb",
        "tris": 2160
      },
      "SOURCED": {
        "file": "DRONEAID_model_latest.blend",
        "object": "Frame_Bottom",
        "scale": 0.05
      }
    },
    "traits": [
      "LABELED",
      "SOURCED",
      "MODELED",
      "COUNTED"
    ]
  },
  {
    "slug": "frame_root",
    "symbols": [
      {
        "slug": "family.plate"
      },
      {
        "slug": "material.carbon"
      },
      {
        "slug": "part"
      }
    ],
    "trait": {
      "COUNTED": {
        "qty": 1
      },
      "LABELED": {
        "description": "Carbon, the hub the arms bolt to — the manual's [1]",
        "name": "Bottom plate"
      },
      "MODELED": {
        "bbox": [
          0.12195,
          0.002,
          0.0969
        ],
        "file": "parts/frame_root.glb",
        "tris": 624
      },
      "SOURCED": {
        "file": "DRONEAID_model_latest.blend",
        "object": "Frame_Star",
        "scale": 0.05
      }
    },
    "traits": [
      "LABELED",
      "SOURCED",
      "MODELED",
      "COUNTED"
    ]
  },
  {
    "slug": "frame_top",
    "symbols": [
      {
        "slug": "family.plate"
      },
      {
        "slug": "material.carbon"
      },
      {
        "slug": "part"
      }
    ],
    "trait": {
      "COUNTED": {
        "qty": 1
      },
      "LABELED": {
        "description": "Carbon — the manual's [2]",
        "name": "Top plate"
      },
      "MODELED": {
        "bbox": [
          0.28225,
          0.002,
          0.04483
        ],
        "file": "parts/frame_top.glb",
        "tris": 1584
      },
      "SOURCED": {
        "file": "DRONEAID_model_latest.blend",
        "object": "Frame_Top",
        "scale": 0.05
      }
    },
    "traits": [
      "LABELED",
      "SOURCED",
      "MODELED",
      "COUNTED"
    ]
  },
  {
    "slug": "grommet",
    "symbols": [
      {
        "slug": "family.grommet"
      },
      {
        "slug": "material.soft_goods"
      },
      {
        "slug": "part"
      },
      {
        "slug": "source.parametric"
      }
    ],
    "trait": {
      "COUNTED": {
        "qty": 8
      },
      "LABELED": {
        "name": "Silicone grommet"
      },
      "PARAMETRIC": {
        "generator": "solid.bushing",
        "params": {
          "inner": 3,
          "length": 5,
          "outer": 6
        }
      }
    },
    "traits": [
      "LABELED",
      "PARAMETRIC",
      "COUNTED"
    ]
  },
  {
    "slug": "head",
    "symbols": [
      {
        "slug": "part"
      }
    ],
    "trait": {
      "LABELED": {
        "description": "The tilting camera head and its lens cover",
        "name": "Head"
      }
    },
    "traits": [
      "LABELED"
    ]
  },
  {
    "slug": "head_shell",
    "symbols": [
      {
        "slug": "family.mount"
      },
      {
        "slug": "material.printed"
      },
      {
        "slug": "part"
      },
      {
        "slug": "source.print_stl"
      }
    ],
    "trait": {
      "COUNTED": {
        "qty": 1
      },
      "LABELED": {
        "name": "Camera head"
      },
      "MODELED": {
        "bbox": [
          0.04725,
          0.03504,
          0.07201
        ],
        "file": "parts/head_shell.glb",
        "tris": 14306
      },
      "SOURCED": {
        "file": "head/drone_head.stl",
        "scale": 0.001
      }
    },
    "traits": [
      "LABELED",
      "SOURCED",
      "MODELED",
      "COUNTED"
    ]
  },
  {
    "slug": "heat_shrink",
    "symbols": [
      {
        "slug": "family.cable"
      },
      {
        "slug": "material.soft_goods"
      },
      {
        "slug": "part"
      }
    ],
    "trait": {
      "COUNTED": {
        "qty": 1
      },
      "LABELED": {
        "name": "Heat shrink"
      }
    },
    "traits": [
      "LABELED",
      "COUNTED"
    ]
  },
  {
    "slug": "hinge",
    "symbols": [
      {
        "slug": "family.mount"
      },
      {
        "slug": "material.printed"
      },
      {
        "slug": "part"
      },
      {
        "slug": "source.print_stl"
      }
    ],
    "trait": {
      "COUNTED": {
        "qty": 4
      },
      "LABELED": {
        "name": "Hinge, short"
      },
      "MODELED": {
        "bbox": [
          0.01618,
          0.00877,
          0.01
        ],
        "file": "parts/hinge.glb",
        "tris": 3482
      },
      "SOURCED": {
        "file": "tail/hinge_short.stl",
        "scale": 0.001
      }
    },
    "traits": [
      "LABELED",
      "SOURCED",
      "MODELED",
      "COUNTED"
    ]
  },
  {
    "slug": "interceptor",
    "symbols": [
      {
        "slug": "part"
      }
    ],
    "trait": {
      "LABELED": {
        "description": "Frame: 10” Partizan Edition PT10 V3 — built as the quadro through the stack, then its own tail, VTX mount and head",
        "name": "PT10 interceptor"
      }
    },
    "traits": [
      "LABELED"
    ]
  },
  {
    "slug": "lens_cover",
    "symbols": [
      {
        "slug": "family.mount"
      },
      {
        "slug": "material.printed"
      },
      {
        "slug": "part"
      },
      {
        "slug": "source.print_stl"
      }
    ],
    "trait": {
      "COUNTED": {
        "qty": 1
      },
      "LABELED": {
        "name": "Camera lens cover (TPU)"
      },
      "MODELED": {
        "bbox": [
          0.0162,
          0.0162,
          0.0064
        ],
        "file": "parts/lens_cover.glb",
        "tris": 1416
      },
      "SOURCED": {
        "file": "head/TPU_lens_cover.stl",
        "scale": 0.001
      }
    },
    "traits": [
      "LABELED",
      "SOURCED",
      "MODELED",
      "COUNTED"
    ]
  },
  {
    "slug": "locknut_m3",
    "symbols": [
      {
        "slug": "family.nut"
      },
      {
        "slug": "material.fastener"
      },
      {
        "slug": "part"
      },
      {
        "slug": "source.parametric"
      }
    ],
    "trait": {
      "COUNTED": {
        "qty": 4
      },
      "LABELED": {
        "name": "Locknut M3"
      },
      "PARAMETRIC": {
        "generator": "fastener.nut",
        "params": {
          "thread": "M3"
        }
      }
    },
    "traits": [
      "LABELED",
      "PARAMETRIC",
      "COUNTED"
    ]
  },
  {
    "slug": "motor",
    "symbols": [
      {
        "slug": "family.motor"
      },
      {
        "slug": "material.motor"
      },
      {
        "slug": "part"
      }
    ],
    "trait": {
      "COUNTED": {
        "qty": 4
      },
      "LABELED": {
        "description": "Brushless motor, 10″ class",
        "name": "Motor"
      },
      "MODELED": {
        "bbox": [
          0.0349,
          0.03624,
          0.0349
        ],
        "file": "parts/motor.glb",
        "tris": 828
      },
      "SOURCED": {
        "file": "DRONEAID_model_latest.blend",
        "object": "Motor0",
        "scale": 0.05
      }
    },
    "traits": [
      "LABELED",
      "SOURCED",
      "MODELED",
      "COUNTED"
    ]
  },
  {
    "slug": "motor_arm",
    "symbols": [
      {
        "slug": "family.arm"
      },
      {
        "slug": "material.carbon"
      },
      {
        "slug": "part"
      }
    ],
    "trait": {
      "COUNTED": {
        "qty": 4
      },
      "LABELED": {
        "description": "Carbon motor arm — the manual's [6]",
        "name": "Arm"
      },
      "MODELED": {
        "bbox": [
          0.04134,
          0.0075,
          0.20863
        ],
        "file": "parts/motor_arm.glb",
        "tris": 80
      },
      "SOURCED": {
        "file": "DRONEAID_model_latest.blend",
        "object": "Motor_Arm3",
        "scale": 0.05
      }
    },
    "traits": [
      "LABELED",
      "SOURCED",
      "MODELED",
      "COUNTED"
    ]
  },
  {
    "slug": "motor_wire",
    "symbols": [
      {
        "slug": "family.cable"
      },
      {
        "slug": "material.electronics"
      },
      {
        "slug": "part"
      },
      {
        "slug": "source.parametric"
      }
    ],
    "trait": {
      "COUNTED": {
        "qty": 4
      },
      "LABELED": {
        "name": "Motor wires"
      },
      "PARAMETRIC": {
        "generator": "cable.route",
        "params": {
          "diameter": 2.4,
          "route": [
            [
              0,
              -0.0082,
              0
            ],
            [
              0.04,
              -0.004,
              -0.045
            ],
            [
              0.1263,
              -0.0033,
              -0.1419
            ]
          ]
        }
      }
    },
    "traits": [
      "LABELED",
      "PARAMETRIC",
      "COUNTED"
    ]
  },
  {
    "slug": "pigtail_holder",
    "symbols": [
      {
        "slug": "family.mount"
      },
      {
        "slug": "material.printed"
      },
      {
        "slug": "part"
      },
      {
        "slug": "source.print_stl"
      }
    ],
    "trait": {
      "COUNTED": {
        "qty": 1
      },
      "LABELED": {
        "name": "VTX pigtail holder"
      },
      "MODELED": {
        "bbox": [
          0.06875,
          0.035,
          0.01768
        ],
        "file": "parts/pigtail_holder.glb",
        "tris": 17378
      },
      "SOURCED": {
        "file": "vtx/vtx_pigtail.stl",
        "scale": 0.001
      }
    },
    "traits": [
      "LABELED",
      "SOURCED",
      "MODELED",
      "COUNTED"
    ]
  },
  {
    "slug": "prop_nut_m5",
    "symbols": [
      {
        "slug": "family.nut"
      },
      {
        "slug": "material.fastener"
      },
      {
        "slug": "part"
      },
      {
        "slug": "source.parametric"
      }
    ],
    "trait": {
      "COUNTED": {
        "qty": 4
      },
      "LABELED": {
        "name": "Prop nut M5"
      },
      "PARAMETRIC": {
        "generator": "fastener.nut",
        "params": {
          "thread": "M5"
        }
      }
    },
    "traits": [
      "LABELED",
      "PARAMETRIC",
      "COUNTED"
    ]
  },
  {
    "slug": "propeller",
    "symbols": [
      {
        "slug": "family.propeller"
      },
      {
        "slug": "material.soft_goods"
      },
      {
        "slug": "part"
      }
    ],
    "trait": {
      "COUNTED": {
        "qty": 4
      },
      "LABELED": {
        "description": "10″ propeller — fitted last, never with a battery connected",
        "name": "Propeller"
      },
      "MODELED": {
        "bbox": [
          0.17347,
          0.00989,
          0.20031
        ],
        "file": "parts/propeller.glb",
        "tris": 14548
      },
      "SOURCED": {
        "file": "DRONEAID_model_latest.blend",
        "object": "Propeller0",
        "scale": 0.05
      }
    },
    "traits": [
      "LABELED",
      "SOURCED",
      "MODELED",
      "COUNTED"
    ]
  },
  {
    "slug": "quadro",
    "symbols": [
      {
        "slug": "part"
      }
    ],
    "trait": {
      "LABELED": {
        "description": "Frame: 10” Partizan Edition PT10 V3 — the plug-and-play build of the EDTH 2026 DroneAid Hamburg manual v1.3.1",
        "name": "DroneAid 10″ quadcopter"
      }
    },
    "traits": [
      "LABELED"
    ]
  },
  {
    "slug": "rx",
    "symbols": [
      {
        "slug": "family.rx"
      },
      {
        "slug": "material.electronics"
      },
      {
        "slug": "part"
      },
      {
        "slug": "source.parametric"
      }
    ],
    "trait": {
      "COUNTED": {
        "qty": 1
      },
      "LABELED": {
        "name": "Receiver (ELRS)"
      },
      "PARAMETRIC": {
        "generator": "solid.box",
        "params": {
          "x": 20,
          "y": 4,
          "z": 12
        }
      }
    },
    "traits": [
      "LABELED",
      "PARAMETRIC",
      "COUNTED"
    ]
  },
  {
    "slug": "stack",
    "symbols": [
      {
        "slug": "part"
      }
    ],
    "trait": {
      "LABELED": {
        "description": "ESC and FC on their grommets, the stack bolts and locknuts",
        "name": "Stack"
      }
    },
    "traits": [
      "LABELED"
    ]
  },
  {
    "slug": "standoff",
    "symbols": [
      {
        "slug": "family.standoff"
      },
      {
        "slug": "material.fastener"
      },
      {
        "slug": "part"
      }
    ],
    "trait": {
      "COUNTED": {
        "qty": 8
      },
      "LABELED": {
        "description": "One standoff of the blend's FrameSpacers, unwelded — stands on its base",
        "name": "Standoff M3 × 27"
      },
      "MODELED": {
        "bbox": [
          0.00572,
          0.02723,
          0.00572
        ],
        "file": "parts/standoff.glb",
        "tris": 124
      },
      "SOURCED": {
        "file": "DRONEAID_model_latest.blend",
        "object": "FrameSpacers.00 (x4)",
        "scale": 0.05
      }
    },
    "traits": [
      "LABELED",
      "SOURCED",
      "MODELED",
      "COUNTED"
    ]
  },
  {
    "slug": "sticker_id",
    "symbols": [
      {
        "slug": "family.sticker"
      },
      {
        "slug": "material.soft_goods"
      },
      {
        "slug": "part"
      }
    ],
    "trait": {
      "COUNTED": {
        "qty": 1
      },
      "LABELED": {
        "name": "Drone ID sticker"
      }
    },
    "traits": [
      "LABELED",
      "COUNTED"
    ]
  },
  {
    "slug": "tail",
    "symbols": [
      {
        "slug": "part"
      }
    ],
    "trait": {
      "LABELED": {
        "description": "The two tail halves, their hinges, the antenna standoff and covers",
        "name": "Tail"
      }
    },
    "traits": [
      "LABELED"
    ]
  },
  {
    "slug": "tail_half_a",
    "symbols": [
      {
        "slug": "family.mount"
      },
      {
        "slug": "material.printed"
      },
      {
        "slug": "part"
      },
      {
        "slug": "source.print_stl"
      }
    ],
    "trait": {
      "COUNTED": {
        "qty": 1
      },
      "LABELED": {
        "name": "Tail half A"
      },
      "MODELED": {
        "bbox": [
          0.0298,
          0.015,
          0.14606
        ],
        "file": "parts/tail_half_a.glb",
        "tris": 14162
      },
      "SOURCED": {
        "file": "tail/tail_half_A_with_holders_star.stl",
        "scale": 0.001
      }
    },
    "traits": [
      "LABELED",
      "SOURCED",
      "MODELED",
      "COUNTED"
    ]
  },
  {
    "slug": "tail_half_b",
    "symbols": [
      {
        "slug": "family.mount"
      },
      {
        "slug": "material.printed"
      },
      {
        "slug": "part"
      },
      {
        "slug": "source.print_stl"
      }
    ],
    "trait": {
      "COUNTED": {
        "qty": 1
      },
      "LABELED": {
        "name": "Tail half B"
      },
      "MODELED": {
        "bbox": [
          0.0298,
          0.015,
          0.14606
        ],
        "file": "parts/tail_half_b.glb",
        "tris": 12866
      },
      "SOURCED": {
        "file": "tail/tail_half_B_with_star.stl",
        "scale": 0.001
      }
    },
    "traits": [
      "LABELED",
      "SOURCED",
      "MODELED",
      "COUNTED"
    ]
  },
  {
    "slug": "tail_mount",
    "symbols": [
      {
        "slug": "family.mount"
      },
      {
        "slug": "material.printed"
      },
      {
        "slug": "part"
      }
    ],
    "trait": {
      "COUNTED": {
        "qty": 1
      },
      "LABELED": {
        "description": "3D-printed tail part — the manual's [8]",
        "name": "Additional RX antenna mount"
      },
      "MODELED": {
        "bbox": [
          0.01574,
          0.01407,
          0.01203
        ],
        "file": "parts/tail_mount.glb",
        "tris": 756
      },
      "SOURCED": {
        "file": "DRONEAID_model_latest.blend",
        "object": "AntennaFixture00",
        "scale": 0.05
      }
    },
    "traits": [
      "LABELED",
      "SOURCED",
      "MODELED",
      "COUNTED"
    ]
  },
  {
    "slug": "thermo_adhesive",
    "symbols": [
      {
        "slug": "family.pad"
      },
      {
        "slug": "material.soft_goods"
      },
      {
        "slug": "part"
      },
      {
        "slug": "source.parametric"
      }
    ],
    "trait": {
      "COUNTED": {
        "qty": 1
      },
      "LABELED": {
        "name": "Thermal adhesive pad"
      },
      "PARAMETRIC": {
        "generator": "solid.box",
        "params": {
          "x": 40,
          "y": 1,
          "z": 22
        }
      }
    },
    "traits": [
      "LABELED",
      "PARAMETRIC",
      "COUNTED"
    ]
  },
  {
    "slug": "top",
    "symbols": [
      {
        "slug": "part"
      }
    ],
    "trait": {
      "LABELED": {
        "description": "The top plate, its bolts, the battery pad and the ID sticker",
        "name": "Top"
      }
    },
    "traits": [
      "LABELED"
    ]
  },
  {
    "slug": "vtx",
    "symbols": [
      {
        "slug": "family.vtx"
      },
      {
        "slug": "material.electronics"
      },
      {
        "slug": "part"
      }
    ],
    "trait": {
      "COUNTED": {
        "qty": 1
      },
      "LABELED": {
        "description": "The VTX, glued and zip-tied to the tail of the middle plate",
        "name": "Video transmitter"
      },
      "MODELED": {
        "bbox": [
          0.04173,
          0.01099,
          0.02295
        ],
        "file": "parts/vtx.glb",
        "tris": 32
      },
      "SOURCED": {
        "file": "DRONEAID_model_latest.blend",
        "object": "Computer",
        "scale": 0.05
      }
    },
    "traits": [
      "LABELED",
      "SOURCED",
      "MODELED",
      "COUNTED"
    ]
  },
  {
    "slug": "vtx_mount",
    "symbols": [
      {
        "slug": "part"
      }
    ],
    "trait": {
      "LABELED": {
        "description": "The VTX spacer and the pigtail holder",
        "name": "VTX mount"
      }
    },
    "traits": [
      "LABELED"
    ]
  },
  {
    "slug": "vtx_pigtail",
    "symbols": [
      {
        "slug": "family.antenna"
      },
      {
        "slug": "material.electronics"
      },
      {
        "slug": "part"
      }
    ],
    "trait": {
      "COUNTED": {
        "qty": 1
      },
      "LABELED": {
        "name": "Pigtail"
      }
    },
    "traits": [
      "LABELED",
      "COUNTED"
    ]
  },
  {
    "slug": "vtx_spacer",
    "symbols": [
      {
        "slug": "family.mount"
      },
      {
        "slug": "material.printed"
      },
      {
        "slug": "part"
      },
      {
        "slug": "source.print_stl"
      }
    ],
    "trait": {
      "COUNTED": {
        "qty": 1
      },
      "LABELED": {
        "name": "VTX 20×20 spacer, 3 mm (TPU)"
      },
      "MODELED": {
        "bbox": [
          0.02429,
          0.003,
          0.02429
        ],
        "file": "parts/vtx_spacer.glb",
        "tris": 1200
      },
      "SOURCED": {
        "file": "vtx/TPU_m2_20x20_3mm_spacer.stl",
        "scale": 0.001
      }
    },
    "traits": [
      "LABELED",
      "SOURCED",
      "MODELED",
      "COUNTED"
    ]
  },
  {
    "slug": "zip_tie",
    "symbols": [
      {
        "slug": "family.zip_tie"
      },
      {
        "slug": "material.soft_goods"
      },
      {
        "slug": "part"
      }
    ],
    "trait": {
      "COUNTED": {
        "qty": 6
      },
      "LABELED": {
        "name": "Zip tie"
      }
    },
    "traits": [
      "LABELED",
      "COUNTED"
    ]
  }
];
