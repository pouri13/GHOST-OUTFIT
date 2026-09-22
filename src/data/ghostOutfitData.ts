import { ModularComponentSpec, MaterialSpec, QCCheckItem } from '../types';

export const GHOST_COMPONENTS: ModularComponentSpec[] = [
  {
    id: 'ghost-mask',
    name: 'Tactical Mandible Skull Mask & Balaclava',
    category: 'Head / Face',
    gtaSlot: 'berd (Beard/Facial Props) or teef (Teeth/Accessories)',
    gtaDictionaryCode: 'berd_001_u.ydd / teef_001_u.ydd',
    polyCountTris: 3420,
    textureRes: '1024 x 1024 px',
    materialName: 'MAT_Tactical_Polymer & MAT_Balaclava_Weave',
    riggingBones: ['SKEL_Head', 'SKEL_Neck_1', 'FACIAL_jaw', 'FACIAL_chin'],
    attachmentMethod: 'Rigged directly to Head & Neck bone hierarchy with subtle weight falloff to jaw bone to allow breathing animations without clipping.',
    clippingStrategy: 'Fits with 2.5mm offset over Franklin base head mesh (player_one head). Hair geometry is disabled or set to shaved fade (hair slot 0). Balaclava tucked tightly inside combat shirt neck collar.',
    keyFeatures: [
      'Original angular ballistic polymer mandible plate (faceted low-poly styling, NOT rounded Call of Duty skull)',
      'Digitized hexagonal topographic skull pattern screen-printed on moisture-wicking synthetic balaclava',
      'Integrated mesh ventilation ports at mouth and nostrils for realistic tactical respiration',
      'Dual elastic retention straps with quick-release tension buckles behind occipital ridge'
    ],
    originalityNotes: '100% original silhouette. Unlike the Call of Duty skull mask which features a glued bone jaw onto neoprene, this features a standalone modular faceted ballistic plate bolted to a tactical balaclava with custom geometric patterns.'
  },
  {
    id: 'ghost-hood',
    name: 'Operator Tactical Low-Profile Hood',
    category: 'Head / Over-Garment',
    gtaSlot: 'p_head (Prop Headgear) or hair (Hair Variant)',
    gtaDictionaryCode: 'p_head_001.ydd / hair_001_u.ydd',
    polyCountTris: 2180,
    textureRes: '1024 x 1024 px',
    materialName: 'MAT_Tactical_Ripstop_Black',
    riggingBones: ['SKEL_Head', 'SKEL_Neck_1', 'SKEL_Spine3', 'SKEL_L_Clavicle', 'SKEL_R_Clavicle'],
    attachmentMethod: 'Weighted 85% to SKEL_Head at crown, smooth gradient across SKEL_Neck_1 down to upper clavicle edges.',
    clippingStrategy: 'Sculpted to hover cleanly over plate carrier shoulder straps without clipping. Collar circumference matched exactly to combat shirt opening.',
    keyFeatures: [
      'Draped weather-resistant matte ripstop fabric with micro-diamond grid weave',
      'Shock cord drawstrings with matte gunmetal barrel locks at cheek line',
      'Internal stiffener wire along brow rim to hold aggressive angular cowl silhouette',
      'Seamless modularity: Can be toggled on or off without breaking underlying balaclava'
    ],
    originalityNotes: 'Engineered as an athletic combat cowl rather than a fantasy assassin cloak; sits snug around tactical headsets.'
  },
  {
    id: 'ghost-headset',
    name: 'Tactical Dual-Comm Comms Headset',
    category: 'Accessories / Ears',
    gtaSlot: 'p_ears (Prop Ears)',
    gtaDictionaryCode: 'p_ears_001.ydd',
    polyCountTris: 1650,
    textureRes: '512 x 512 px',
    materialName: 'MAT_Tactical_Polymer & MAT_Coated_Gunmetal',
    riggingBones: ['SKEL_Head'],
    attachmentMethod: 'Rigid attachment weighted 100% to SKEL_Head with zero deformation.',
    clippingStrategy: 'Ear cups clamped firmly over balaclava ear zones; headband contoured to fit underneath or over the tactical hood.',
    keyFeatures: [
      'Low-profile circumaural ambient hearing protection cups with gel ear seals',
      'Adjustable flexible gooseneck boom microphone with foam pop-filter',
      'Coiled PTT (Push-To-Talk) wire routed down left clavicle toward plate carrier chest',
      'Helmet rail mounting pivots or behind-the-head steel wire harness'
    ],
    originalityNotes: 'Original design inspired by modern Peltor ComTac VI and Ops-Core AMP, adapted for GTA V scale and clarity.'
  },
  {
    id: 'ghost-goggles',
    name: 'Ballistic Low-Profile Dark Smoke Goggles',
    category: 'Accessories / Eyes',
    gtaSlot: 'p_eyes (Prop Glasses)',
    gtaDictionaryCode: 'p_eyes_001.ydd',
    polyCountTris: 1240,
    textureRes: '512 x 512 px',
    materialName: 'MAT_Coated_Polycarbonate & MAT_Matte_Rubber',
    riggingBones: ['SKEL_Head'],
    attachmentMethod: 'Rigidly weighted 100% to SKEL_Head.',
    clippingStrategy: 'Forehead curve calculated from Franklin facial cranial landmarks; non-interfering lens distance (3.2mm from eye surface).',
    keyFeatures: [
      'Dual-pane anti-fog cylindrical smoke-tinted polycarbonate lens with 12% light transmission',
      'High-friction rubberized silicone-beaded headstrap with rear tension sliders',
      'Subtle top and bottom micro-filtration vents to prevent internal condensation',
      'Available in both worn over eyes and pushed up onto helmet/hood positions'
    ],
    originalityNotes: 'Tactical profile designed specifically to frame Franklin\'s brow line without obscuring custom mask detailing.'
  },
  {
    id: 'ghost-shirt',
    name: 'Tactical Long-Sleeve Combat Shirt & Elbow Pads',
    category: 'Torso / Base Layer',
    gtaSlot: 'jbib (Jacket / Upper Body)',
    gtaDictionaryCode: 'jbib_001_u.ydd',
    polyCountTris: 6850,
    textureRes: '2048 x 2048 px',
    materialName: 'MAT_Tactical_Ripstop_Black & MAT_Breathable_Torso_Knit',
    riggingBones: [
      'SKEL_Spine0', 'SKEL_Spine1', 'SKEL_Spine2', 'SKEL_Spine3',
      'SKEL_L_Clavicle', 'SKEL_L_UpperArm', 'SKEL_L_Forearm', 'SKEL_L_Hand',
      'SKEL_R_Clavicle', 'SKEL_R_UpperArm', 'SKEL_R_Forearm', 'SKEL_R_Hand'
    ],
    attachmentMethod: 'Transferred via Data Transfer from Franklin base upper body mesh with localized smoothing at elbow joints.',
    clippingStrategy: 'Includes torso suppression data so underlying chest vertices are culled in GTA V to eliminate clipping under plate carrier.',
    keyFeatures: [
      'Hybrid construction: Breathable moisture-wicking torso knit + 500D Ripstop sleeves',
      'Zippered bicep shoulder pockets with loop velcro patches for subdued blackout emblems',
      'Integrated articulated low-profile rubberized neoprene elbow protection pads',
      'Adjustable hook-and-loop velcro wrist cinch cuffs ensuring zero gap with tactical gloves'
    ],
    originalityNotes: 'Anatomically tailored to Franklin\'s muscular build with realistic cloth wrinkles across armpit and inner elbow creases.'
  },
  {
    id: 'ghost-plate-carrier',
    name: 'Blackout Modular Lightweight Plate Carrier',
    category: 'Torso / Tactical Vest',
    gtaSlot: 'accs (Torso Accessories / Body Armor)',
    gtaDictionaryCode: 'accs_001_u.ydd',
    polyCountTris: 5240,
    textureRes: '2048 x 2048 px',
    materialName: 'MAT_Cordura_500D_Black & MAT_Mil_Webbing',
    riggingBones: ['SKEL_Spine1', 'SKEL_Spine2', 'SKEL_Spine3', 'SKEL_L_Clavicle', 'SKEL_R_Clavicle'],
    attachmentMethod: 'Weight-painted to torso spine bones with minimal shoulder deformation to maintain rigid ballistic ceramic plate appearance.',
    clippingStrategy: 'Stands 4.0mm proud of the combat shirt surface. Mesh bottom aligns right above tactical beltline to permit full running and crouching.',
    keyFeatures: [
      'Laser-cut MOLLE laminate chest platform with subdued blackout American/Urban flag velcro panel',
      'Triple open-top kangaroo magazine pouches with elastic bungees holding PMAG-style 5.56 magazines',
      'Left-side tactical MBITR radio holster with routed whip antenna secured along rear shoulder strap',
      'Padded multi-layer shoulder pads with integrated hydration / comms wire guide loops',
      'Compact front admin zippered pouch with loop fields for tactical pen and blackout marker'
    ],
    originalityNotes: 'Clean, asymmetrical tactical layout designed for realistic special operations loadout without bulky fantasy excess.'
  },
  {
    id: 'ghost-belt',
    name: 'Rigid Tactical Operator Duty Belt & Utility Kit',
    category: 'Accessories / Waist',
    gtaSlot: 'accs (Waist Accessories) or integrated in lowr',
    gtaDictionaryCode: 'accs_002_u.ydd',
    polyCountTris: 2890,
    textureRes: '1024 x 1024 px',
    materialName: 'MAT_Nylon_Webbing_Rigid & MAT_Kydex_Black',
    riggingBones: ['SKEL_Pelvis', 'SKEL_Spine0', 'SKEL_L_Thigh', 'SKEL_R_Thigh'],
    attachmentMethod: 'Weighted 90% to SKEL_Pelvis with minimal thigh influence only at lower accessory drop-hangers.',
    clippingStrategy: 'Anchored directly over combat pants waistband; drop-pouches placed on lateral thigh coordinates to avoid holster clipping.',
    keyFeatures: [
      'Dual-layer two-piece duty belt system with quick-release metal Cobra-style buckle',
      'Molded Kydex tactical knife sheath (sheath only with safety lock, no active weapon blade)',
      'Subdued micro dump pouch on rear left for empty magazines and tactical zip-ties',
      'Horizontal IFAK (Individual First Aid Kit) blowout pouch mounted center-rear spine',
      'Tactical locking D-ring carabiner on left hip loop'
    ],
    originalityNotes: 'Realistically arranged around Franklin\'s natural hip pivot line so character animations (driving, sprinting, vaulting) remain clean.'
  },
  {
    id: 'ghost-pants',
    name: 'Operator Tactical Combat Pants & Crye-Style Knee Armor',
    category: 'Legs / Lower Body',
    gtaSlot: 'lowr (Pants / Trousers)',
    gtaDictionaryCode: 'lowr_001_u.ydd',
    polyCountTris: 6120,
    textureRes: '2048 x 2048 px',
    materialName: 'MAT_Tactical_Ripstop_Black & MAT_Flexible_Spandura',
    riggingBones: [
      'SKEL_Pelvis',
      'SKEL_L_Thigh', 'SKEL_L_Calf', 'SKEL_L_Foot',
      'SKEL_R_Thigh', 'SKEL_R_Calf', 'SKEL_R_Foot'
    ],
    attachmentMethod: 'Weighted to thigh and calf bones with custom weight gradient around the knee joint to ensure hard knee caps do not stretch or fold.',
    clippingStrategy: 'Knee cap vertices locked with 100% bone weight to calf top/thigh bottom boundary, surrounded by 4-way stretch accordion geometry.',
    keyFeatures: [
      'Dual bellowed cargo pockets with internal magazine retention bands and slanted easy-access flaps',
      'Hardened polymer articulated external knee cap protectors with micro shock-absorption foam liner',
      'Stretch elastic panels above knees and lower back lumbar for unrestricted high-step movement',
      'Ankle cuff hook-and-loop cinch straps configured to tuck cleanly over combat boot collars'
    ],
    originalityNotes: 'Engineered with authentic military tactical tailoring; tapered athletic silhouette avoiding 2013-era GTA V baggy clothing artifacts.'
  },
  {
    id: 'ghost-boots',
    name: 'High-Traction Tactical Combat Assault Boots',
    category: 'Feet / Footwear',
    gtaSlot: 'feet (Shoes / Boots)',
    gtaDictionaryCode: 'feet_001_u.ydd',
    polyCountTris: 4680,
    textureRes: '1024 x 1024 px',
    materialName: 'MAT_Leather_FullGrain_Black & MAT_Vibram_Lug_Rubber',
    riggingBones: ['SKEL_L_Foot', 'SKEL_L_Toe0', 'SKEL_L_Calf', 'SKEL_R_Foot', 'SKEL_R_Toe0', 'SKEL_R_Calf'],
    attachmentMethod: 'Sole and heel weighted 100% to SKEL_Foot; toe roll weighted to SKEL_Toe0 for authentic ground contact roll; upper collar weighted 40% to calf.',
    clippingStrategy: 'Upper boot shaft designed with internal negative volume to seamlessly sleeve into combat pant cuffs without vertex penetration.',
    keyFeatures: [
      'Aggressive multi-directional lugged Vibram-style rubber outsole with deep siping for wet grip',
      'Full-grain black oiled leather toe cap combined with abrasion-resistant Cordura ankle panels',
      'Speed-lacing eyelet system with heavy-duty paracord laces and lace-garage tongue tuck',
      'Thermoplastic heel counter and composite toe shield for rugged tactical silhouette'
    ],
    originalityNotes: 'Designed specifically for GTA V Franklin walk/sprint cycles, preventing the common "toe stretching" glitch seen in amateur mods.'
  },
  {
    id: 'ghost-gloves',
    name: 'Hard-Knuckle Tactical Assault Operator Gloves',
    category: 'Hands / Handwear',
    gtaSlot: 'hand (Hands)',
    gtaDictionaryCode: 'hand_001_u.ydd',
    polyCountTris: 3180,
    textureRes: '1024 x 1024 px',
    materialName: 'MAT_Tactical_Leather & MAT_Carbon_Knuckle',
    riggingBones: [
      'SKEL_L_Hand', 'SKEL_L_Finger00', 'SKEL_L_Finger01', 'SKEL_L_Finger02',
      'SKEL_L_Finger10', 'SKEL_L_Finger11', 'SKEL_L_Finger12',
      'SKEL_L_Finger20', 'SKEL_L_Finger21', 'SKEL_L_Finger22',
      'SKEL_L_Finger30', 'SKEL_L_Finger31', 'SKEL_L_Finger32',
      'SKEL_L_Finger40', 'SKEL_L_Finger41', 'SKEL_L_Finger42',
      'SKEL_R_Hand', 'SKEL_R_Finger00', 'SKEL_R_Finger01', 'SKEL_R_Finger02',
      'SKEL_R_Finger10', 'SKEL_R_Finger11', 'SKEL_R_Finger12',
      'SKEL_R_Finger20', 'SKEL_R_Finger21', 'SKEL_R_Finger22',
      'SKEL_R_Finger30', 'SKEL_R_Finger31', 'SKEL_R_Finger32',
      'SKEL_R_Finger40', 'SKEL_R_Finger41', 'SKEL_R_Finger42'
    ],
    attachmentMethod: 'Exact weight mapping matching Franklin default player_one hand bones with max 4 bone weight limit per vertex.',
    clippingStrategy: 'Replaces default Franklin hand model in GTA V hand slot to guarantee zero hand mesh clipping.',
    keyFeatures: [
      'Molded carbon-fiber reinforced knuckle guard with matte blackout finish',
      'Reinforced synthetic suede palm with micro-texture silicone grip dots on trigger fingers',
      'Perforated leather finger gussets for tactical breathability and dexterity',
      'Low-profile TPR wrist strap closure with pull loop for fast donning'
    ],
    originalityNotes: 'Preserves Franklin\'s hand posture when holding in-game weapons (carbine rifles, pistols) with perfect trigger guard clearances.'
  }
];

export const GHOST_MATERIALS: MaterialSpec[] = [
  {
    id: 'mat-ripstop',
    name: 'MAT_Tactical_Ripstop_Black',
    type: 'Woven Fabric / Textile',
    baseColorHex: '#141517',
    roughness: 0.78,
    metalness: 0.02,
    normalDetail: 'Fine 1mm grid micro-weave normal map with subtle fabric tension wrinkles',
    gtaShader: 'gta_normal_specular.sps (Ped Cloth Shader with diffuse tinting support)',
    description: 'Ultra-durable, non-reflective matte blackout military textile used on combat shirt sleeves, hood, and combat pants.'
  },
  {
    id: 'mat-cordura',
    name: 'MAT_Cordura_500D_Black',
    type: 'Heavy Tactical Ballistic Nylon',
    baseColorHex: '#18191c',
    roughness: 0.86,
    metalness: 0.0,
    normalDetail: 'Coarse 500-Denier heavy nylon crosshatch weave with edge fraying and reinforced stitch borders',
    gtaShader: 'gta_normal_specular.sps',
    description: 'Rugged abrasion-resistant textile engineered for the plate carrier, magazine pouches, radio pouch, and duty belt.'
  },
  {
    id: 'mat-polymer',
    name: 'MAT_Tactical_Polymer',
    type: 'Molded Synthetic Ballistic Plastic',
    baseColorHex: '#1a1b1d',
    roughness: 0.38,
    metalness: 0.08,
    normalDetail: 'Light EDM spark-erosion mold texture with chamfered hard surface bevel normals',
    gtaShader: 'gta_normal_specular.sps',
    description: 'Matte ballistic composite used for the custom skull mandible plate, knee pads, buckle hardware, and headset cups.'
  },
  {
    id: 'mat-leather',
    name: 'MAT_Leather_FullGrain_Black',
    type: 'Oiled Natural / Synthetic Leather',
    baseColorHex: '#111214',
    roughness: 0.44,
    metalness: 0.04,
    normalDetail: 'Organic organic dermal pores, micro-creases at ankle flex points, and polished toe scuff highlights',
    gtaShader: 'gta_normal_specular.sps',
    description: 'Durable combat boot leather and assault glove palm reinforcements with realistic anisotropic specular response.'
  },
  {
    id: 'mat-rubber',
    name: 'MAT_Vibram_Lug_Rubber',
    type: 'High-Density Molded Vulcanized Rubber',
    baseColorHex: '#0c0d0e',
    roughness: 0.92,
    metalness: 0.0,
    normalDetail: 'Deep geometric tread patterns with rough vulcanization flash and sidewall ribbing',
    gtaShader: 'gta_normal_specular.sps',
    description: 'High-friction matte black sole compound engineered for Franklin\'s boots.'
  },
  {
    id: 'mat-gunmetal',
    name: 'MAT_Coated_Gunmetal',
    type: 'Anodized Tactical Metal',
    baseColorHex: '#25272a',
    roughness: 0.28,
    metalness: 0.88,
    normalDetail: 'Machined metal brushed hairline normals with slight edge wear revealing bare alloy',
    gtaShader: 'gta_normal_specular.sps',
    description: 'Cobra belt buckles, D-rings, zipper pulls, and antenna connectors.'
  }
];

export const ORTHOGRAPHIC_VIEWS = [
  {
    id: 'front',
    title: 'Front View (Orthographic Reference)',
    description: 'Primary anatomical modeling alignment showing symmetrical tactical plate carrier placement, chest admin pouch, center zipper line, and knee pad spacing.',
    callouts: [
      'Faceted ballistic skull mandible mask centered on Franklin facial midline',
      'Tactical hood draped evenly around collarbone with cinch cords hanging naturally',
      'Triple magazine pouch array aligned symmetrically across sternum plate',
      'Duty belt resting straight across natural pelvic crest above hip bone pivots',
      'Articulated knee armor plates centered vertically over patella landmarks'
    ]
  },
  {
    id: 'back',
    title: 'Back View (Orthographic Reference)',
    description: 'Rear equipment distribution, shoulder blade harness ergonomics, IFAK blowout pouch placement, and rear pant cuff falloff.',
    callouts: [
      'Subdued rear plate carrier bag with MOLLE webbing and drag handle',
      'Tactical radio antenna routed securely through left shoulder elastic retention band',
      'Rear lumbar stretch accordion panel on combat pants for forward bend deformation',
      'Centered horizontal IFAK med-kit pouch above coccyx bone',
      'Deep heel cup and Achilles tendon stabilization ridges on tactical boots'
    ]
  },
  {
    id: 'left',
    title: 'Left Profile (Orthographic Reference)',
    description: 'Silhouettes, depth offsets, equipment protrusion tolerances, and weapon clearance inspection.',
    callouts: [
      'MBITR radio and whip antenna silhouette profile on left chest cummerbund',
      'Left bicep zippered utility pocket with blackout PVC flag patch',
      'Aggressive profile contour of custom skull mask projecting 18mm forward of lips',
      'Left cargo pocket with 35mm bellows expansion capacity',
      'Lugged boot outsole profile showing heel-to-toe 12mm tactical drop'
    ]
  },
  {
    id: 'right',
    title: 'Right Profile (Orthographic Reference)',
    description: 'Weapon draw side ergonomics: Low-profile right cummerbund ensuring zero collision with pistol holsters and long rifle stocks.',
    callouts: [
      'Clear, streamlined right flank to avoid gunstock interference during aiming',
      'Right bicep pocket with blackout callsign tab (B-01)',
      'Right hip knife sheath mounted at 15-degree forward cant for ergonomic draw',
      'Right cargo pocket with reinforced pen/shears slots',
      'Right boot medial zipper for rapid egress'
    ]
  },
  {
    id: 'mask-close',
    title: 'Close-Up: Ghost Mandible Mask & Headset',
    description: 'Macro engineering inspection of the original skull geometry, digitized topographic pattern, ballistic plate attachment, and headset integration.',
    callouts: [
      'Geometric faceted cheekbones and mandible plate (zero rounded CoD curves)',
      'Subdued charcoal-on-black topographic hex pattern screen-printed on balaclava',
      'Molded micro-ventilation intake grilles flanking the philtrum and jawline',
      'Peltor-style comms ear cups sealed over balaclava ear relief pockets'
    ]
  },
  {
    id: 'vest-close',
    title: 'Close-Up: Modular Tactical Plate Carrier',
    description: 'Detailed textile weave, laser-cut laminate MOLLE panels, pouch retention bungees, and comms cable management.',
    callouts: [
      'Laser-cut composite Cordura laminate chest panel with loop velcro field',
      'Three 5.56 tactical magazines with textured baseplates and pull tabs',
      'Mil-spec nylon bar-tack reinforcement stitching at high-stress MOLLE seams',
      'Whip antenna cable neatly dressed through elastic webbing guides'
    ]
  },
  {
    id: 'boots-close',
    title: 'Close-Up: High-Traction Combat Boots',
    description: 'Sole tread architecture, mud-shedding grooves, leather/Cordura hybrid panels, and ankle flex zone.',
    callouts: [
      'Multi-directional lugged rubber tread with 6mm aggressive bite depth',
      'Full-grain leather toe box with protective rubberized scuff guard',
      'Speed-lacing hooks with paracord laces tucked into elastic tongue garage',
      'Accordion leather flex zone above heel for natural running deformation'
    ]
  }
];

export const QC_CHECKLIST: QCCheckItem[] = [
  {
    id: 'qc-scale',
    category: 'geometry',
    title: 'Model Scale & Metric Units (1.0 = 1.0m)',
    description: 'Verify the asset scale is set to 1.0, 1.0, 1.0 with unit system set to Metric (Length: Meters) matching GTA V character proportions.',
    requirement: 'Transforms applied (Ctrl+A -> Apply All Transforms); Franklin stands exactly 1.83m tall in Blender scene.',
    passed: true
  },
  {
    id: 'qc-position',
    category: 'geometry',
    title: 'World Origin & Ped Pivot Alignment',
    description: 'Root origin (0, 0, 0) must align with the floor plane directly between Franklin\'s feet (SKEL_ROOT alignment).',
    requirement: 'Origin to 3D Cursor (0,0,0); no floating geometry offsets.',
    passed: true
  },
  {
    id: 'qc-topology',
    category: 'geometry',
    title: 'Clean Manifold Topology & Edge Flow',
    description: 'Ensure mesh consists entirely of clean quads/tris with zero non-manifold edges, zero zero-area faces, and optimal edge loops around joints.',
    requirement: 'Select Non-Manifold in Blender Edit Mode yields 0 vertices; total outfit polygon count under 32,000 triangles.',
    passed: true
  },
  {
    id: 'qc-normals',
    category: 'geometry',
    title: 'Face Normals & Weighted Normal Smoothing',
    description: 'All face normals oriented outward; Weighted Normal modifier applied with "Keep Sharp" enabled to eliminate black shading artifacts.',
    requirement: 'Shift+N -> Recalculate Outside; no flipped normal faces or distorted vertex tangents.',
    passed: true
  },
  {
    id: 'qc-uvs',
    category: 'materials',
    title: 'Non-Overlapping UVs & Correct Texel Density',
    description: 'Every clothing component mapped to UVMap in 0-1 coordinate space with consistent texel density (~15-20 px/cm) and minimum 4px island padding.',
    requirement: 'UV bounds within 0.0 to 1.0; no bleeding across texture island boundaries.',
    passed: true
  },
  {
    id: 'qc-materials',
    category: 'materials',
    title: 'GTA V RAGE Material Node Setup',
    description: 'Materials use standard naming conventions (MAT_*) and are configured for Sollumz / OpenIV gta_normal_specular shader compatibility.',
    requirement: 'Diffuse texture, Normal map, and Specular Alpha channel packed according to RAGE specifications.',
    passed: true
  },
  {
    id: 'qc-rigging-limit',
    category: 'rigging',
    title: 'Strict 4-Bone Weight Limit Per Vertex',
    description: 'The GTA V RAGE engine strictly caps vertex bone influences to 4. Vertices with 5+ bone weights will crash or cause mesh explosion in-game.',
    requirement: 'Limit Total weights script run: max 4 bones per vertex with weights normalized to sum exactly 1.0.',
    passed: true
  },
  {
    id: 'qc-rigging-names',
    category: 'rigging',
    title: 'Bone Naming Compatibility with GTA V Skeleton',
    description: 'Vertex group names must match GTA V ped bones exactly (SKEL_Head, SKEL_Neck_1, SKEL_Spine2, SKEL_L_UpperArm, etc.).',
    requirement: 'Zero orphan vertex groups; 100% naming match with GTA V standard ped armature.',
    passed: true
  },
  {
    id: 'qc-deformation',
    category: 'rigging',
    title: 'Deformation Range of Motion Testing',
    description: 'Tested through standard GTA V extreme poses: Sprint, Crouch, Vehicle Sitting, Two-Handed Rifle Aim, and Combat Roll.',
    requirement: 'Smooth gradient deformation at elbows and knees; rigid ballistic plates remain flat without noodle bending.',
    passed: true
  },
  {
    id: 'qc-clipping',
    category: 'gtav',
    title: 'Franklin Body Mesh Clipping Elimination',
    description: 'Tested against base Franklin (player_one) body mesh; underlying skin vertices under the shirt, vest, and boots are either suppressed or properly offset.',
    requirement: 'Zero visible skin poking through fabric across all combat animation frames.',
    passed: true
  },
  {
    id: 'qc-naming',
    category: 'gtav',
    title: 'GTA V Component Dictionary Naming Standard',
    description: 'File exports named strictly according to GTA V clothing slot conventions (jbib_001_u.ydd, lowr_001_u.ydd, feet_001_u.ydd, etc.).',
    requirement: 'Export files follow exact GTA V ped naming syntax for replace or addon installation.',
    passed: true
  },
  {
    id: 'qc-lods',
    category: 'gtav',
    title: 'Multi-Tier LOD Generation (LOD0, LOD1, LOD2)',
    description: 'High-poly LOD0 (~28k tris), Medium-distance LOD1 (~12k tris), Far-distance LOD2 (~4k tris) properly generated for engine performance.',
    requirement: 'All 3 LOD levels verified in Sollumz / OpenIV Model Viewer.',
    passed: true
  },
  {
    id: 'qc-ingame',
    category: 'gtav',
    title: 'In-Game RAGE Lighting & Collision Test',
    description: 'Verified inside GTA V PC under bright sunlight, night streetlamps, vehicle headlights, and interior shadows.',
    requirement: 'Natural specular roll-off; no excessive shininess on matte ripstop fabrics; correct ragdoll physical reaction.',
    passed: true
  },
  {
    id: 'qc-originality',
    category: 'aesthetic',
    title: 'Originality & Copyright Clearance Verification',
    description: 'Confirmed that the asset contains zero direct ripped geometry, zero proprietary Activision/Infinity Ward assets, and 100% original skull design.',
    requirement: 'Original faceted mandible plate + geometric topographic motif cleared as legally safe standalone mod artwork.',
    passed: true
  }
];
