export const configDataList = [
  "__init__.py",
  "crafter-image.yml",
  "encode-image.yml",
  "encode-text.yml",
  "filter.yml",
  "index-comp.yml",
  "index-doc.yml",
  "ranker.yml",
  "segment.yml",
  "segmenter.py",
  "weighted_ranker.py",
]
export const configUrl = "https://jina-hello-multimodal.s3.amazonaws.com/config"

export const indexFlow =
  "jtype: Flow\n" +
  "version: '1'\n" +
  "with:\n" +
  "  restful: true\n" +
  "  port_expose: 45678\n" +
  "pods:\n" +
  "  - name: segment\n" +
  "    uses: segment.yml\n" +
  "  # first pathway\n" +
  "  - name: filter_text\n" +
  "    uses: filter.yml\n" +
  "    env:\n" +
  "      filter_mime: text/plain\n" +
  "  - name: textEncoder\n" +
  "    uses: encode-text.yml\n" +
  "  - name: textModIndexer\n" +
  "    uses: index-comp.yml\n" +
  "    env:\n" +
  "      indexer_name: text\n" +
  "  # second pathway, in parallel\n" +
  "  - name: filter_image\n" +
  "    uses: filter.yml\n" +
  "    env:\n" +
  "      filter_mime: image/jpeg\n" +
  "    needs: segment\n" +
  "  - name: imageCrafter\n" +
  "    uses: crafter-image.yml\n" +
  "  - name: imageEncoder\n" +
  "    uses: encode-image.yml\n" +
  "  - name: imageModIndexer\n" +
  "    uses: index-comp.yml\n" +
  "    env:\n" +
  "      indexer_name: image\n" +
  "  # third pathway, in parallel\n" +
  "  - name: docIndexer\n" +
  "    uses: index-doc.yml\n" +
  "    needs: segment\n" +
  "  # join all parallel works\n" +
  "  - needs: [docIndexer, imageModIndexer, textModIndexer]\n" +
  "    name: joiner"

export const queryFlow =
  "jtype: Flow\n" +
  "version: '1'\n" +
  "read_only: true\n" +
  "with:\n" +
  "  restful: true\n" +
  "  port_expose: 45678\n" +
  "pods:\n" +
  "  # first pathway\n" +
  "  - name: filter_text\n" +
  "    uses: filter.yml\n" +
  "    env:\n" +
  "      filter_mime: text/plain\n" +
  "  - name: textEncoder\n" +
  "    uses: encode-text.yml\n" +
  "  - name: textModIndexer\n" +
  "    uses: index-comp.yml\n" +
  "    env:\n" +
  "      indexer_name: text\n" +
  "  # second pathway, in parallel\n" +
  "  - name: filter_image\n" +
  "    uses: filter.yml\n" +
  "    env:\n" +
  "      filter_mime: image/jpeg\n" +
  "    needs: gateway\n" +
  "  - name: imageCrafter\n" +
  "    uses: crafter-image.yml\n" +
  "  - name: imageEncoder\n" +
  "    uses: encode-image.yml\n" +
  "  - name: imageModIndexer\n" +
  "    uses: index-comp.yml\n" +
  "    env:\n" +
  "      indexer_name: image\n" +
  "  # join\n" +
  "  - needs: [imageModIndexer, textModIndexer]\n" +
  "    name: joiner\n" +
  "    uses: _merge_chunks\n" +
  "  - uses: ranker.yml\n" +
  "    name: ranker\n" +
  "  - name: docIndexer\n" +
  "    uses: index-doc.yml\n"

export const indexData = [
  {
    "1": 4,
    "image_1.jpg": "image_4.jpg",
    "A beautiful young girl posing on a white background.":
      "One hand pointing, finger out, thumb up",
    FIELD4: "",
    FIELD5: "",
    FIELD6: "",
  },
  {
    "1": 6,
    "image_1.jpg": "image_6.jpg",
    "A beautiful young girl posing on a white background.":
      "A beautiful young girl posing with a gray background.",
    FIELD4: "",
    FIELD5: "",
    FIELD6: "",
  },
  {
    "1": 3,
    "image_1.jpg": "image_3.jpg",
    "A beautiful young girl posing on a white background.":
      "Medical stitches - puncture wound closed up",
    FIELD4: "",
    FIELD5: "",
    FIELD6: "",
  },
  {
    "1": 15,
    "image_1.jpg": "image_15.jpg",
    "A beautiful young girl posing on a white background.": "A happy couple",
    FIELD4: "",
    FIELD5: "",
    FIELD6: "",
  },
  {
    "1": 11,
    "image_1.jpg": "image_11.jpg",
    "A beautiful young girl posing on a white background.":
      "Young girl dancing on stage in tutu\n2,image_2.jpg, A man thinking with a white mask\n14,image_14.jpg,Businessman with lightbulb head - Thinking process and ideas in a business context\n10,image_10.jpg,Mother and baby in swimming pool\n5,image_5.jpg,my hand compared to ancient handprints of anasazi tribes\n18,image_18.jpg,Young boy dreams of being a superhero - Child imagination and creativity concept\n8,image_8.jpg,Sulky and angry young kid on the couch\n12,image_12.jpg,My Baby after bath\n16,image_16.jpg,Woman sketching a social network on virtual screen\n17,image_17.jpg,Nice dress (wedding)\n19,image_19.jpg,Girls with flowers and sharee\n24,image_24.jpg,Young woman holding purse smiles\n25,image_25.jpg,A beautiful young girl posing with a white background.\n20,image_20.jpg,",
    FIELD4: ' watching the ducks."',
    FIELD5: "",
    FIELD6: "",
  },
  {
    "1": 28,
    "image_1.jpg": "image_28.jpg",
    "A beautiful young girl posing on a white background.":
      "Silhouette of woman flexing biceps",
    FIELD4: "",
    FIELD5: "",
    FIELD6: "",
  },
  {
    "1": 23,
    "image_1.jpg": "image_23.jpg",
    "A beautiful young girl posing on a white background.": "happy swimmer",
    FIELD4: "",
    FIELD5: "",
    FIELD6: "",
  },
  {
    "1": 29,
    "image_1.jpg": "image_29.jpg",
    "A beautiful young girl posing on a white background.":
      "Cute young toddler in a sweatshirt and a knit cap",
    FIELD4: "",
    FIELD5: "",
    FIELD6: "",
  },
  {
    "1": 26,
    "image_1.jpg": "image_26.jpg",
    "A beautiful young girl posing on a white background.":
      "Attractive caucasian woman looking at camera.",
    FIELD4: "",
    FIELD5: "",
    FIELD6: "",
  },
  {
    "1": 27,
    "image_1.jpg": "image_27.jpg",
    "A beautiful young girl posing on a white background.":
      " Cute little girls with wild hair and a look of mischief.",
    FIELD4: "",
    FIELD5: "",
    FIELD6: "",
  },
  {
    "1": 30,
    "image_1.jpg": "image_30.jpg",
    "A beautiful young girl posing on a white background.":
      "Young boy in meditation position - tropical beach background",
    FIELD4: "",
    FIELD5: "",
    FIELD6: "",
  },
  {
    "1": 32,
    "image_1.jpg": "image_32.jpg",
    "A beautiful young girl posing on a white background.":
      "Hand silhouette in heart shape with sunset in the middle and ocean background",
    FIELD4: "",
    FIELD5: "",
    FIELD6: "",
  },
  {
    "1": 33,
    "image_1.jpg": "image_33.jpg",
    "A beautiful young girl posing on a white background.":
      'Tattoo says \\"Woman\\" in Chinese',
    FIELD4: "",
    FIELD5: "",
    FIELD6: "",
  },
  {
    "1": 34,
    "image_1.jpg": "image_34.jpg",
    "A beautiful young girl posing on a white background.":
      "Stylish little girl eating a shaved ice snow cone.",
    FIELD4: "",
    FIELD5: "",
    FIELD6: "",
  },
  {
    "1": 31,
    "image_1.jpg": "image_31.jpg",
    "A beautiful young girl posing on a white background.":
      "Helpful phone operator fields calls.",
    FIELD4: "",
    FIELD5: "",
    FIELD6: "",
  },
  {
    "1": 40,
    "image_1.jpg": "image_40.jpg",
    "A beautiful young girl posing on a white background.":
      "Small child playing on the beach in the bright sun.",
    FIELD4: "",
    FIELD5: "",
    FIELD6: "",
  },
  {
    "1": 38,
    "image_1.jpg": "image_38.jpg",
    "A beautiful young girl posing on a white background.":
      "Portrait of woman wearing sunglasses on the beach",
    FIELD4: "",
    FIELD5: "",
    FIELD6: "",
  },
  {
    "1": 36,
    "image_1.jpg": "image_36.jpg",
    "A beautiful young girl posing on a white background.":
      "Little girl writing on blackboard - Learning and knowledge concept",
    FIELD4: "",
    FIELD5: "",
    FIELD6: "",
  },
  {
    "1": 37,
    "image_1.jpg": "image_37.jpg",
    "A beautiful young girl posing on a white background.":
      "beautiful female torso on summer sea backgroung",
    FIELD4: "",
    FIELD5: "",
    FIELD6: "",
  },
  {
    "1": 41,
    "image_1.jpg": "image_41.jpg",
    "A beautiful young girl posing on a white background.":
      "Child makes choices on computer touch screen.",
    FIELD4: "",
    FIELD5: "",
    FIELD6: "",
  },
  {
    "1": 47,
    "image_1.jpg": "image_47.jpg",
    "A beautiful young girl posing on a white background.":
      "Profile of woman against white light box",
    FIELD4: "",
    FIELD5: "",
    FIELD6: "",
  },
  {
    "1": 42,
    "image_1.jpg": "image_42.jpg",
    "A beautiful young girl posing on a white background.":
      "Little girl sticks out her tongue in play defiance.",
    FIELD4: "",
    FIELD5: "",
    FIELD6: "",
  },
  {
    "1": 45,
    "image_1.jpg": "image_45.jpg",
    "A beautiful young girl posing on a white background.":
      "A romantic couple enjoying the sunset in a tropical island",
    FIELD4: "",
    FIELD5: "",
    FIELD6: "",
  },
  {
    "1": 43,
    "image_1.jpg": "image_43.jpg",
    "A beautiful young girl posing on a white background.":
      "Hands typing on laptop keyboard - fuzzy looks",
    FIELD4: "",
    FIELD5: "",
    FIELD6: "",
  },
  {
    "1": 48,
    "image_1.jpg": "image_48.jpg",
    "A beautiful young girl posing on a white background.":
      "Person connecting and sharing using social media networks - With speech bubbles featuring Facebook, Google Plus, Instagram, Pinterest, Linkedin, Skype, Tumblr, Twitter and Youtube",
    FIELD4: "",
    FIELD5: "",
    FIELD6: "",
  },
  {
    "1": 50,
    "image_1.jpg": "image_50.jpg",
    "A beautiful young girl posing on a white background.":
      "young boy jumping of joy on beach background",
    FIELD4: "",
    FIELD5: "",
    FIELD6: "",
  },
  {
    "1": 49,
    "image_1.jpg": "image_49.jpg",
    "A beautiful young girl posing on a white background.":
      "Businessman leader rising in a hot air balloon - Leadership concept",
    FIELD4: "",
    FIELD5: "",
    FIELD6: "",
  },
  {
    "1": 52,
    "image_1.jpg": "image_52.jpg",
    "A beautiful young girl posing on a white background.":
      " Man in train station wearing black over ear headphones",
    FIELD4: "",
    FIELD5: "",
    FIELD6: "",
  },
  {
    "1": 51,
    "image_1.jpg": "image_51.jpg",
    "A beautiful young girl posing on a white background.":
      "Red haired young woman with lip piercing looks at camera",
    FIELD4: "",
    FIELD5: "",
    FIELD6: "",
  },
  {
    "1": 54,
    "image_1.jpg": "image_54.jpg",
    "A beautiful young girl posing on a white background.":
      "Child painting a watercolor",
    FIELD4: "",
    FIELD5: "",
    FIELD6: "",
  },
  {
    "1": 53,
    "image_1.jpg": "image_53.jpg",
    "A beautiful young girl posing on a white background.":
      "Neck and back of a head of a sitting man with head turned",
    FIELD4: "",
    FIELD5: "",
    FIELD6: "",
  },
  {
    "1": 57,
    "image_1.jpg": "image_57.jpg",
    "A beautiful young girl posing on a white background.":
      "Medical Doctor Studying the Human Body - Concept",
    FIELD4: "",
    FIELD5: "",
    FIELD6: "",
  },
  {
    "1": 59,
    "image_1.jpg": "image_59.jpg",
    "A beautiful young girl posing on a white background.":
      "An call center professional wearing a white corporate attire",
    FIELD4: "",
    FIELD5: "",
    FIELD6: "",
  },
  {
    "1": 58,
    "image_1.jpg": "image_58.jpg",
    "A beautiful young girl posing on a white background.":
      "A statue overlooking the Chicago skyline.",
    FIELD4: "",
    FIELD5: "",
    FIELD6: "",
  },
  {
    "1": 56,
    "image_1.jpg": "image_56.jpg",
    "A beautiful young girl posing on a white background.":
      "Healthy young woman practicing yoga at sunset on the beach",
    FIELD4: "",
    FIELD5: "",
    FIELD6: "",
  },
  {
    "1": 60,
    "image_1.jpg": "image_60.jpg",
    "A beautiful young girl posing on a white background.":
      "Back to school - Study concept",
    FIELD4: "",
    FIELD5: "",
    FIELD6: "",
  },
  {
    "1": 55,
    "image_1.jpg": "image_55.jpg",
    "A beautiful young girl posing on a white background.":
      "Businessman Holding Light Bulb on Chalkboard",
    FIELD4: "",
    FIELD5: "",
    FIELD6: "",
  },
  {
    "1": 61,
    "image_1.jpg": "image_61.jpg",
    "A beautiful young girl posing on a white background.":
      "Exitced young pretty woman headshot.",
    FIELD4: "",
    FIELD5: "",
    FIELD6: "",
  },
  {
    "1": 62,
    "image_1.jpg": "image_62.jpg",
    "A beautiful young girl posing on a white background.":
      "A smiling young healthcare worker in his white clean uniform",
    FIELD4: "",
    FIELD5: "",
    FIELD6: "",
  },
  {
    "1": 65,
    "image_1.jpg": "image_65.jpg",
    "A beautiful young girl posing on a white background.":
      "Sunset at the Honey Island Beach",
    FIELD4: "",
    FIELD5: "",
    FIELD6: "",
  },
  {
    "1": 63,
    "image_1.jpg": "image_63.jpg",
    "A beautiful young girl posing on a white background.":
      "Sending a newsletter mail to your contacts - Online marketing concept",
    FIELD4: "",
    FIELD5: "",
    FIELD6: "",
  },
  {
    "1": 64,
    "image_1.jpg": "image_64.jpg",
    "A beautiful young girl posing on a white background.":
      "Brown Haired Young Woman In Camel Jacket Looking At Camera",
    FIELD4: "",
    FIELD5: "",
    FIELD6: "",
  },
  {
    "1": 69,
    "image_1.jpg": "image_69.jpg",
    "A beautiful young girl posing on a white background.":
      "Dark Roasted Cofee beans",
    FIELD4: "",
    FIELD5: "",
    FIELD6: "",
  },
  {
    "1": 68,
    "image_1.jpg": "image_68.jpg",
    "A beautiful young girl posing on a white background.":
      "A girl making a big bubble",
    FIELD4: "",
    FIELD5: "",
    FIELD6: "",
  },
  {
    "1": 71,
    "image_1.jpg": "image_71.jpg",
    "A beautiful young girl posing on a white background.":
      "Hand and lightbulb - Creativity and ideas concept",
    FIELD4: "",
    FIELD5: "",
    FIELD6: "",
  },
  {
    "1": 67,
    "image_1.jpg": "image_67.jpg",
    "A beautiful young girl posing on a white background.":
      "Child playfully making circles around his eyes as he faces the camera with the sun in front of him.",
    FIELD4: "",
    FIELD5: "",
    FIELD6: "",
  },
  {
    "1": 66,
    "image_1.jpg": "image_66.jpg",
    "A beautiful young girl posing on a white background.":
      "Young Woman Jogging at Sunset - Fitness and Health",
    FIELD4: "",
    FIELD5: "",
    FIELD6: "",
  },
  {
    "1": 70,
    "image_1.jpg": "image_70.jpg",
    "A beautiful young girl posing on a white background.":
      "Street scene with pedestrians walking through bubbles",
    FIELD4: "",
    FIELD5: "",
    FIELD6: "",
  },
  {
    "1": 72,
    "image_1.jpg": "image_72.jpg",
    "A beautiful young girl posing on a white background.":
      "Happy woman in red dress, vintage look.",
    FIELD4: "",
    FIELD5: "",
    FIELD6: "",
  },
  {
    "1": 73,
    "image_1.jpg": "image_73.jpg",
    "A beautiful young girl posing on a white background.":
      "Businessman having an idea - Problem-solving in a business context",
    FIELD4: "",
    FIELD5: "",
    FIELD6: "",
  },
  {
    "1": 74,
    "image_1.jpg": "image_74.jpg",
    "A beautiful young girl posing on a white background.":
      "Hand placing coins on a coin stack with upward arrow - Income and asset growth concept",
    FIELD4: "",
    FIELD5: "",
    FIELD6: "",
  },
  {
    "1": 76,
    "image_1.jpg": "image_76.jpg",
    "A beautiful young girl posing on a white background.":
      "A boy in the desert sunset",
    FIELD4: "",
    FIELD5: "",
    FIELD6: "",
  },
  {
    "1": 80,
    "image_1.jpg": "image_80.jpg",
    "A beautiful young girl posing on a white background.":
      "Young woman puts shopping bags over her shoulder.",
    FIELD4: "",
    FIELD5: "",
    FIELD6: "",
  },
  {
    "1": 75,
    "image_1.jpg": "image_75.jpg",
    "A beautiful young girl posing on a white background.":
      "Medical Human Body Scan - Man and Technology",
    FIELD4: "",
    FIELD5: "",
    FIELD6: "",
  },
  {
    "1": 78,
    "image_1.jpg": "image_78.jpg",
    "A beautiful young girl posing on a white background.":
      "Two kids in an old city street",
    FIELD4: "",
    FIELD5: "",
    FIELD6: "",
  },
  {
    "1": 83,
    "image_1.jpg": "image_83.jpg",
    "A beautiful young girl posing on a white background.":
      "A young man wearing a brown casual shirt carying a black laptop",
    FIELD4: "",
    FIELD5: "",
    FIELD6: "",
  },
  {
    "1": 81,
    "image_1.jpg": "image_81.jpg",
    "A beautiful young girl posing on a white background.":
      "Enjoying a glass of wine is always a pleasure.",
    FIELD4: "",
    FIELD5: "",
    FIELD6: "",
  },
  {
    "1": 84,
    "image_1.jpg": "image_84.jpg",
    "A beautiful young girl posing on a white background.":
      "A woman with fours bags smelling a flowe",
    FIELD4: "",
    FIELD5: "",
    FIELD6: "",
  },
  {
    "1": 77,
    "image_1.jpg": "image_77.jpg",
    "A beautiful young girl posing on a white background.":
      "Binary computer code on human face - Online privacy concept",
    FIELD4: "",
    FIELD5: "",
    FIELD6: "",
  },
  {
    "1": 79,
    "image_1.jpg": "image_79.jpg",
    "A beautiful young girl posing on a white background.":
      "A young man kisses a young woman on the cheek.",
    FIELD4: "",
    FIELD5: "",
    FIELD6: "",
  },
  {
    "1": 82,
    "image_1.jpg": "image_82.jpg",
    "A beautiful young girl posing on a white background.": "Cute Baby Boy",
    FIELD4: "",
    FIELD5: "",
    FIELD6: "",
  },
  {
    "1": 86,
    "image_1.jpg": "image_86.jpg",
    "A beautiful young girl posing on a white background.":
      "Newborn Baby Feet in Mothers Hands",
    FIELD4: "",
    FIELD5: "",
    FIELD6: "",
  },
  {
    "1": 87,
    "image_1.jpg": "image_87.jpg",
    "A beautiful young girl posing on a white background.":
      "A foot with part of a knit sock on the needles.",
    FIELD4: "",
    FIELD5: "",
    FIELD6: "",
  },
  {
    "1": 91,
    "image_1.jpg": "image_91.jpg",
    "A beautiful young girl posing on a white background.":
      "Man with clock head - Slave to time concept",
    FIELD4: "",
    FIELD5: "",
    FIELD6: "",
  },
  {
    "1": 85,
    "image_1.jpg": "image_85.jpg",
    "A beautiful young girl posing on a white background.":
      "Female Medical Doctor Analyzing DNA strands",
    FIELD4: "",
    FIELD5: "",
    FIELD6: "",
  },
  {
    "1": 88,
    "image_1.jpg": "image_88.jpg",
    "A beautiful young girl posing on a white background.":
      "Sleeping beauty - A naked princess of the woods - Double exposure effect",
    FIELD4: "",
    FIELD5: "",
    FIELD6: "",
  },
  {
    "1": 90,
    "image_1.jpg": "image_90.jpg",
    "A beautiful young girl posing on a white background.":
      "Woman in red dress looks over her shoulder.",
    FIELD4: "",
    FIELD5: "",
    FIELD6: "",
  },
  {
    "1": 93,
    "image_1.jpg": "image_93.jpg",
    "A beautiful young girl posing on a white background.":
      "A beautiful young girl texting on a cell phone.",
    FIELD4: "",
    FIELD5: "",
    FIELD6: "",
  },
  {
    "1": 94,
    "image_1.jpg": "image_94.jpg",
    "A beautiful young girl posing on a white background.":
      "Young woman thinking while facing camera",
    FIELD4: "",
    FIELD5: "",
    FIELD6: "",
  },
  {
    "1": 92,
    "image_1.jpg": "image_92.jpg",
    "A beautiful young girl posing on a white background.":
      "Man sitting alone on bench looking at phone",
    FIELD4: "",
    FIELD5: "",
    FIELD6: "",
  },
  {
    "1": 96,
    "image_1.jpg": "image_96.jpg",
    "A beautiful young girl posing on a white background.":
      "Only Love is Real - A Couple Embraces Under Light - Drawing with Copyspace",
    FIELD4: "",
    FIELD5: "",
    FIELD6: "",
  },
  {
    "1": 95,
    "image_1.jpg": "image_95.jpg",
    "A beautiful young girl posing on a white background.":
      "Woman Working On Laptop - Close-Up of Hands",
    FIELD4: "",
    FIELD5: "",
    FIELD6: "",
  },
  {
    "1": 98,
    "image_1.jpg": "image_98.jpg",
    "A beautiful young girl posing on a white background.":
      "Businessman holding a ball with information technology icons",
    FIELD4: "",
    FIELD5: "",
    FIELD6: "",
  },
]
