export interface MonikersCard {
  name: string
  description: string
  category: "person" | "concept" | "mythology" | "history" | "geography" | "entertainment"
}

export const monikersCards: MonikersCard[] = [
  // Real People
  {
    name: "Albert Einstein",
    description: "Physicist known for the theory of relativity and E=mc²",
    category: "person",
  },
  {
    name: "Beyoncé",
    description: "Pop superstar, former Destiny's Child member, married to Jay-Z",
    category: "person",
  },
  { name: "Elon Musk", description: "CEO of Tesla and SpaceX, bought Twitter", category: "person" },
  {
    name: "Taylor Swift",
    description: "Pop country singer known for songs about her exes",
    category: "person",
  },
  {
    name: "Gordon Ramsay",
    description: "British chef famous for yelling at people on Hell's Kitchen",
    category: "person",
  },
  {
    name: "Oprah Winfrey",
    description: "Talk show host known for giving away cars",
    category: "person",
  },
  {
    name: "Michael Jordan",
    description: "Basketball legend, 6-time NBA champion, Air Jordans",
    category: "person",
  },
  {
    name: "Queen Elizabeth II",
    description: "Longest-reigning British monarch, loved corgis",
    category: "person",
  },
  {
    name: "Steve Jobs",
    description: "Apple co-founder, turtleneck enthusiast",
    category: "person",
  },
  {
    name: "Marilyn Monroe",
    description: "1950s Hollywood icon, sang Happy Birthday to JFK",
    category: "person",
  },
  {
    name: "Bob Ross",
    description: "Painter with an afro who loved happy little trees",
    category: "person",
  },
  {
    name: "Muhammad Ali",
    description: "Boxing legend who floated like a butterfly",
    category: "person",
  },
  {
    name: "Freddie Mercury",
    description: "Queen frontman, iconic mustache, Bohemian Rhapsody",
    category: "person",
  },
  {
    name: "Leonardo da Vinci",
    description: "Renaissance artist and inventor, painted the Mona Lisa",
    category: "person",
  },
  {
    name: "Cleopatra",
    description: "Ancient Egyptian queen, had affairs with Caesar and Mark Antony",
    category: "person",
  },
  {
    name: "Elvis Presley",
    description: "The King of Rock and Roll, hip shaker",
    category: "person",
  },
  {
    name: "Dwayne 'The Rock' Johnson",
    description: "Wrestler turned actor, can you smell what he's cooking?",
    category: "person",
  },
  {
    name: "Abraham Lincoln",
    description: "16th US President, tall guy with a top hat, freed the slaves",
    category: "person",
  },
  {
    name: "Marie Curie",
    description: "Scientist who discovered radioactivity, won 2 Nobel Prizes",
    category: "person",
  },
  {
    name: "David Attenborough",
    description: "British naturalist who narrates nature documentaries",
    category: "person",
  },
  {
    name: "Snoop Dogg",
    description: "Rapper who loves weed and says 'fo shizzle'",
    category: "person",
  },
  {
    name: "Martha Stewart",
    description: "Lifestyle guru who went to prison, friends with Snoop",
    category: "person",
  },
  {
    name: "Arnold Schwarzenegger",
    description: "Terminator actor, 'I'll be back', former California governor",
    category: "person",
  },
  {
    name: "Dolly Parton",
    description: "Country singer with big hair, 9 to 5, Dollywood",
    category: "person",
  },
  {
    name: "Kanye West",
    description: "Rapper who interrupted Taylor Swift, now goes by Ye",
    category: "person",
  },
  {
    name: "Serena Williams",
    description: "Tennis legend with 23 Grand Slam titles",
    category: "person",
  },
  {
    name: "Walt Disney",
    description: "Created Mickey Mouse and the happiest place on Earth",
    category: "person",
  },
  {
    name: "Pablo Picasso",
    description: "Artist who painted faces with eyes on the same side",
    category: "person",
  },
  {
    name: "William Shakespeare",
    description: "Playwright who wrote Romeo and Juliet, invented words",
    category: "person",
  },
  {
    name: "Mahatma Gandhi",
    description: "Led India's independence through nonviolent protest",
    category: "person",
  },
  {
    name: "Britney Spears",
    description: "Pop princess, hit me baby one more time, free Britney",
    category: "person",
  },
  {
    name: "Mike Tyson",
    description: "Boxer who bit off Evander Holyfield's ear",
    category: "person",
  },
  {
    name: "Lady Gaga",
    description: "Pop star who wore a meat dress, poker face",
    category: "person",
  },
  { name: "Neil Armstrong", description: "First person to walk on the moon", category: "person" },
  {
    name: "Frida Kahlo",
    description: "Mexican artist known for self-portraits with unibrow",
    category: "person",
  },
  {
    name: "Tom Hanks",
    description: "America's dad, Wilson!, ran across the country",
    category: "person",
  },
  { name: "Adele", description: "British singer, Hello from the other side", category: "person" },
  { name: "Jeff Bezos", description: "Bald Amazon founder who went to space", category: "person" },
  { name: "Cardi B", description: "Rapper who says 'okurrr' and throws shoes", category: "person" },
  {
    name: "Stephen Hawking",
    description: "Physicist in wheelchair who wrote about black holes",
    category: "person",
  },
  {
    name: "Kim Kardashian",
    description: "Reality TV star famous for her curves and selfies",
    category: "person",
  },
  {
    name: "Robin Williams",
    description: "Comedian who voiced the Genie, Mrs. Doubtfire",
    category: "person",
  },
  {
    name: "David Bowie",
    description: "Ziggy Stardust, glam rock icon, different colored eyes",
    category: "person",
  },
  {
    name: "Mark Zuckerberg",
    description: "Facebook creator, lizard person conspiracy, loves BBQ sauce",
    category: "person",
  },

  // Concepts/Things
  {
    name: "A Hot Dog",
    description: "Sausage in a bun, baseball stadium food",
    category: "concept",
  },
  { name: "A Selfie", description: "Photo you take of yourself with a phone", category: "concept" },
  {
    name: "Netflix and Chill",
    description: "Watching streaming TV that leads to something else",
    category: "concept",
  },
  {
    name: "The Walk of Shame",
    description: "Going home in last night's clothes",
    category: "concept",
  },
  { name: "A Food Coma", description: "Being sleepy after eating too much", category: "concept" },
  { name: "Dad Jokes", description: "Corny puns that make you groan", category: "concept" },
  {
    name: "Monday Morning",
    description: "The worst day to start the work week",
    category: "concept",
  },
  {
    name: "A Karen",
    description: "Person who demands to speak to the manager",
    category: "concept",
  },
  { name: "FOMO", description: "Fear of missing out on something fun", category: "concept" },
  {
    name: "A Hangover",
    description: "Feeling terrible after drinking too much",
    category: "concept",
  },
  { name: "A Bad Hair Day", description: "When your hair won't cooperate", category: "concept" },
  {
    name: "Mansplaining",
    description: "When a man explains something condescendingly",
    category: "concept",
  },
  { name: "A Couch Potato", description: "Someone who watches TV all day", category: "concept" },
  {
    name: "Déjà Vu",
    description: "Feeling like you've experienced something before",
    category: "concept",
  },
  {
    name: "Procrastination",
    description: "Putting off things you should be doing",
    category: "concept",
  },
  {
    name: "A Brain Freeze",
    description: "Headache from eating ice cream too fast",
    category: "concept",
  },
  { name: "Road Rage", description: "Getting angry at other drivers", category: "concept" },
  { name: "An Awkward Silence", description: "When nobody knows what to say", category: "concept" },
  { name: "A Midlife Crisis", description: "Buying a sports car at 50", category: "concept" },
  {
    name: "Ghosting",
    description: "Disappearing and not responding to messages",
    category: "concept",
  },
  {
    name: "A Mic Drop",
    description: "Dropping the microphone after saying something epic",
    category: "concept",
  },
  {
    name: "The Friend Zone",
    description: "When someone only sees you as a friend",
    category: "concept",
  },
  {
    name: "A Plot Twist",
    description: "Unexpected turn of events in a story",
    category: "concept",
  },
  { name: "Clickbait", description: "Headlines that trick you into clicking", category: "concept" },
  {
    name: "A Photobomb",
    description: "Ruining someone's photo by jumping in",
    category: "concept",
  },
  {
    name: "Adulting",
    description: "Doing responsible grown-up things like paying bills",
    category: "concept",
  },
  {
    name: "Binge Watching",
    description: "Watching an entire TV series in one sitting",
    category: "concept",
  },
  {
    name: "A Side Eye",
    description: "Judging someone by looking sideways at them",
    category: "concept",
  },
  {
    name: "A Wardrobe Malfunction",
    description: "When clothing fails at the worst moment",
    category: "concept",
  },
  {
    name: "Zoom Fatigue",
    description: "Being exhausted from too many video calls",
    category: "concept",
  },
  {
    name: "A Guilty Pleasure",
    description: "Something you enjoy but are embarrassed about",
    category: "concept",
  },
  {
    name: "Cancel Culture",
    description: "When the internet decides someone is over",
    category: "concept",
  },
  {
    name: "A Sugar Rush",
    description: "Hyper energy from eating too much candy",
    category: "concept",
  },
  { name: "Spam Email", description: "Junk messages about Nigerian princes", category: "concept" },
  {
    name: "An All-Nighter",
    description: "Staying up all night to finish something",
    category: "concept",
  },
  {
    name: "Stage Fright",
    description: "Being terrified to perform in front of people",
    category: "concept",
  },
  { name: "A Power Nap", description: "Short sleep to recharge your energy", category: "concept" },
  {
    name: "Imposter Syndrome",
    description: "Feeling like a fraud despite your success",
    category: "concept",
  },
  {
    name: "A Bucket List",
    description: "Things you want to do before you die",
    category: "concept",
  },
  {
    name: "Retail Therapy",
    description: "Shopping to make yourself feel better",
    category: "concept",
  },
  {
    name: "A Freudian Slip",
    description: "Accidentally saying what you really think",
    category: "concept",
  },
  {
    name: "Writer's Block",
    description: "When you can't think of what to write",
    category: "concept",
  },
  {
    name: "Elevator Music",
    description: "Boring background music you hear everywhere",
    category: "concept",
  },
  {
    name: "A Spoiler Alert",
    description: "Warning that plot details are coming",
    category: "concept",
  },

  // Australian Things
  {
    name: "A Bunnings Snag",
    description: "Sausage sizzle outside a hardware store, Aussie tradition",
    category: "concept",
  },
  {
    name: "A Party Pie",
    description: "Tiny meat pie you eat at Australian parties",
    category: "concept",
  },
  {
    name: "Fairy Bread",
    description: "White bread with butter and hundreds and thousands",
    category: "concept",
  },
  {
    name: "A Shoey",
    description: "Drinking beer out of your shoe, Aussie celebration",
    category: "concept",
  },
  {
    name: "Drop Bears",
    description: "Fake deadly koalas Aussies warn tourists about",
    category: "concept",
  },
  {
    name: "Vegemite on Toast",
    description: "Salty yeast spread that only Australians like",
    category: "concept",
  },
  {
    name: "A Servo Run",
    description: "Quick trip to the petrol station for snacks",
    category: "concept",
  },
  {
    name: "Wearing Thongs",
    description: "Flip-flops on your feet, not underwear",
    category: "concept",
  },
  {
    name: "A Goon Bag",
    description: "Cheap boxed wine, Aussie party essential",
    category: "concept",
  },
  {
    name: "Smashed Avo",
    description: "Avocado toast that's apparently why you can't buy a house",
    category: "concept",
  },
  {
    name: "A Magpie Attack",
    description: "Getting swooped by an angry bird in spring",
    category: "concept",
  },
  {
    name: "A Tim Tam Slam",
    description: "Using a Tim Tam as a straw for hot chocolate",
    category: "concept",
  },

  // Recent Slang & Internet Terms
  {
    name: "Brainrot",
    description: "When your mind is ruined by too much internet content",
    category: "concept",
  },
  {
    name: "Doom Scrolling",
    description: "Endlessly scrolling through bad news on your phone",
    category: "concept",
  },
  {
    name: "Quiet Quitting",
    description: "Doing the bare minimum at work without actually quitting",
    category: "concept",
  },
  {
    name: "The Ick",
    description: "Sudden feeling of disgust toward someone you liked",
    category: "concept",
  },
  {
    name: "Main Character Energy",
    description: "Acting like you're the star of your own movie",
    category: "concept",
  },
  {
    name: "Touch Grass",
    description: "Telling someone to go outside and get off the internet",
    category: "concept",
  },
  {
    name: "Chronically Online",
    description: "Someone who spends way too much time on the internet",
    category: "concept",
  },
  {
    name: "Situationship",
    description: "Romantic relationship without labels or commitment",
    category: "concept",
  },
  {
    name: "Beige Flag",
    description: "Odd but not necessarily bad trait in dating",
    category: "concept",
  },
  {
    name: "NPC Behavior",
    description: "Acting like a background character in a video game",
    category: "concept",
  },
  { name: "Unhinged", description: "Chaotic behavior, often in a funny way", category: "concept" },

  // More General Concepts
  {
    name: "A Conspiracy Theory",
    description: "Believing the government is hiding something",
    category: "concept",
  },
  {
    name: "Murphy's Law",
    description: "Anything that can go wrong will go wrong",
    category: "concept",
  },
  {
    name: "The Butterfly Effect",
    description: "Small actions causing huge consequences",
    category: "concept",
  },
  {
    name: "A Plot Armor",
    description: "When a character can't die because they're important",
    category: "concept",
  },
  {
    name: "A Hot Take",
    description: "Controversial opinion meant to provoke people",
    category: "concept",
  },
  { name: "A Humble Brag", description: "Bragging disguised as a complaint", category: "concept" },
  {
    name: "A Panic Buy",
    description: "Hoarding toilet paper before a crisis",
    category: "concept",
  },
  {
    name: "A Revenge Body",
    description: "Getting fit after a breakup to make your ex jealous",
    category: "concept",
  },
  {
    name: "Sunday Scaries",
    description: "Anxiety about Monday ruining your Sunday night",
    category: "concept",
  },
  {
    name: "Bed Rotting",
    description: "Spending the whole day in bed doing nothing",
    category: "concept",
  },
  {
    name: "A Glow Up",
    description: "Major positive transformation in appearance",
    category: "concept",
  },
  {
    name: "Muscle Memory",
    description: "Your body remembering how to do things automatically",
    category: "concept",
  },

  // Mythology
  {
    name: "Zeus",
    description: "Greek king of the gods, throws lightning bolts, cheats on his wife",
    category: "mythology",
  },
  {
    name: "Medusa",
    description: "Greek monster with snakes for hair, turns people to stone",
    category: "mythology",
  },
  { name: "Thor", description: "Norse god of thunder with a big hammer", category: "mythology" },
  { name: "Poseidon", description: "Greek god of the sea with a trident", category: "mythology" },
  {
    name: "Athena",
    description: "Greek goddess of wisdom, born from Zeus's head",
    category: "mythology",
  },
  {
    name: "Loki",
    description: "Norse trickster god, shapeshifter, causes chaos",
    category: "mythology",
  },
  {
    name: "Hercules",
    description: "Greek hero who did 12 impossible labors",
    category: "mythology",
  },
  {
    name: "Aphrodite",
    description: "Greek goddess of love, born from sea foam",
    category: "mythology",
  },
  {
    name: "Hades",
    description: "Greek god of the underworld, kidnapped Persephone",
    category: "mythology",
  },
  {
    name: "Odin",
    description: "Norse all-father god, gave up an eye for wisdom, has two ravens",
    category: "mythology",
  },
  { name: "Anubis", description: "Egyptian jackal-headed god of the dead", category: "mythology" },
  { name: "Cupid", description: "Roman god of love who shoots arrows", category: "mythology" },
  {
    name: "The Minotaur",
    description: "Greek bull-headed monster trapped in a labyrinth",
    category: "mythology",
  },
  { name: "Achilles", description: "Greek warrior with one weak heel", category: "mythology" },
  { name: "Apollo", description: "Greek god of the sun, music, and poetry", category: "mythology" },
  { name: "Pandora", description: "Greek woman who opened a box of evils", category: "mythology" },
  { name: "Icarus", description: "Greek boy who flew too close to the sun", category: "mythology" },
  { name: "Ra", description: "Egyptian sun god with a falcon head", category: "mythology" },
  {
    name: "Cerberus",
    description: "Greek three-headed dog guarding the underworld",
    category: "mythology",
  },
  { name: "Pegasus", description: "Greek winged horse", category: "mythology" },
  { name: "The Cyclops", description: "Greek one-eyed giant", category: "mythology" },
  { name: "Dionysus", description: "Greek god of wine and parties", category: "mythology" },
  {
    name: "The Phoenix",
    description: "Mythical bird that rises from its own ashes",
    category: "mythology",
  },
  {
    name: "King Midas",
    description: "Greek king whose touch turned things to gold",
    category: "mythology",
  },
  { name: "Ares", description: "Greek god of war, not very popular", category: "mythology" },
  {
    name: "Narcissus",
    description: "Greek man who fell in love with his own reflection",
    category: "mythology",
  },
  {
    name: "The Sphinx",
    description: "Egyptian creature with lion body and human head, loves riddles",
    category: "mythology",
  },
  {
    name: "Odysseus",
    description: "Greek hero who took 10 years to get home",
    category: "mythology",
  },
  {
    name: "Freya",
    description: "Norse goddess of love and beauty, rides a chariot pulled by cats",
    category: "mythology",
  },
  {
    name: "The Kraken",
    description: "Scandinavian sea monster that attacks ships",
    category: "mythology",
  },
  {
    name: "A Dragon",
    description: "Fire-breathing winged reptile that hoards gold",
    category: "mythology",
  },
  {
    name: "A Unicorn",
    description: "Magical horse with a single horn on its head",
    category: "mythology",
  },
  {
    name: "A Mermaid",
    description: "Half-woman half-fish creature who lures sailors",
    category: "mythology",
  },
  {
    name: "A Werewolf",
    description: "Human who transforms into a wolf at full moon",
    category: "mythology",
  },
  {
    name: "A Vampire",
    description: "Undead creature that drinks blood and fears garlic",
    category: "mythology",
  },
  {
    name: "The Hydra",
    description: "Greek serpent that grows two heads when you cut one off",
    category: "mythology",
  },
  {
    name: "A Griffin",
    description: "Creature with eagle head and lion body",
    category: "mythology",
  },
  { name: "A Centaur", description: "Half-human half-horse creature", category: "mythology" },
  {
    name: "The Loch Ness Monster",
    description: "Scottish lake monster, nicknamed Nessie",
    category: "mythology",
  },
  {
    name: "Bigfoot",
    description: "Large hairy ape-man seen in North American forests",
    category: "mythology",
  },
  {
    name: "A Leprechaun",
    description: "Irish fairy who hides gold at the end of rainbows",
    category: "mythology",
  },
  {
    name: "A Banshee",
    description: "Irish spirit whose scream predicts death",
    category: "mythology",
  },
  {
    name: "The Chupacabra",
    description: "Latin American creature that sucks blood from goats",
    category: "mythology",
  },
  {
    name: "A Gorgon",
    description: "Greek monster sisters with snakes for hair",
    category: "mythology",
  },
  {
    name: "A Siren",
    description: "Greek creatures whose singing lured sailors to their deaths",
    category: "mythology",
  },
  {
    name: "A Harpy",
    description: "Greek monster with woman's face and bird body",
    category: "mythology",
  },
  {
    name: "The Chimera",
    description: "Greek monster with lion head, goat body, snake tail",
    category: "mythology",
  },
  { name: "A Basilisk", description: "Serpent king whose gaze kills", category: "mythology" },
  {
    name: "A Goblin",
    description: "Small mischievous creature that causes trouble",
    category: "mythology",
  },
  { name: "An Ogre", description: "Large ugly man-eating giant", category: "mythology" },
  {
    name: "A Troll",
    description: "Scandinavian creature that lives under bridges",
    category: "mythology",
  },
  { name: "Fenrir", description: "Norse giant wolf destined to kill Odin", category: "mythology" },
  { name: "A Fairy", description: "Tiny magical winged creature", category: "mythology" },
  { name: "The Yeti", description: "Abominable snowman of the Himalayas", category: "mythology" },

  // History (Events)
  {
    name: "The French Revolution",
    description: "When France chopped off their king's head and went crazy",
    category: "history",
  },
  {
    name: "The Moon Landing",
    description: "When humans first walked on the moon in 1969",
    category: "history",
  },
  {
    name: "The Fall of the Berlin Wall",
    description: "When East and West Germany reunited in 1989",
    category: "history",
  },
  {
    name: "The Titanic Sinking",
    description: "Unsinkable ship hit an iceberg on its first voyage",
    category: "history",
  },
  {
    name: "The Black Death",
    description: "Plague that killed a third of Europe in the 1300s",
    category: "history",
  },
  {
    name: "The Boston Tea Party",
    description: "When Americans dumped tea into the harbor to protest taxes",
    category: "history",
  },
  {
    name: "D-Day",
    description: "Allied invasion of Normandy beaches in WWII",
    category: "history",
  },
  {
    name: "The Gold Rush",
    description: "When everyone rushed to California to find gold in 1849",
    category: "history",
  },
  {
    name: "The Industrial Revolution",
    description: "When machines replaced handmade everything",
    category: "history",
  },
  {
    name: "The Renaissance",
    description: "When Europe rediscovered art and science after the Dark Ages",
    category: "history",
  },
  {
    name: "The Assassination of JFK",
    description: "When the US president was shot in Dallas",
    category: "history",
  },
  {
    name: "The Signing of the Magna Carta",
    description: "When English nobles forced the king to share power",
    category: "history",
  },
  {
    name: "The Pompeii Eruption",
    description: "When Mount Vesuvius buried an entire Roman city in ash",
    category: "history",
  },
  {
    name: "The Trojan Horse",
    description: "Greeks hiding in a wooden horse to sneak into Troy",
    category: "history",
  },
  {
    name: "The Salem Witch Trials",
    description: "When Massachusetts went crazy accusing people of witchcraft",
    category: "history",
  },
  {
    name: "The Building of the Pyramids",
    description: "Ancient Egyptians stacking giant stones for tombs",
    category: "history",
  },
  {
    name: "The Hindenburg Disaster",
    description: "When a giant airship exploded while landing",
    category: "history",
  },
  {
    name: "The Running of the Bulls",
    description: "Spanish festival where people run from angry bulls",
    category: "history",
  },
  {
    name: "The Silk Road",
    description: "Ancient trade route connecting China to Europe",
    category: "history",
  },
  {
    name: "The Cuban Missile Crisis",
    description: "When the US and USSR almost started nuclear war",
    category: "history",
  },
  {
    name: "The Crusades",
    description: "Medieval wars to capture the Holy Land",
    category: "history",
  },
  {
    name: "The Prohibition Era",
    description: "When America banned alcohol and created speakeasies",
    category: "history",
  },
  {
    name: "The Spanish Inquisition",
    description: "When the Catholic Church tortured heretics in Spain",
    category: "history",
  },
  {
    name: "The California Gold Rush",
    description: "1849 mass migration to find gold out West",
    category: "history",
  },
  {
    name: "The Discovery of Penicillin",
    description: "When moldy bread accidentally saved millions of lives",
    category: "history",
  },
  {
    name: "The Roswell Incident",
    description: "When a UFO allegedly crashed in New Mexico",
    category: "history",
  },
  {
    name: "The Great Fire of London",
    description: "1666 fire that destroyed most of the city",
    category: "history",
  },
  {
    name: "The Boxer Rebellion",
    description: "Chinese uprising against foreign influence in 1900",
    category: "history",
  },
  {
    name: "The Trail of Tears",
    description: "Forced relocation of Native Americans from their lands",
    category: "history",
  },
  {
    name: "The Storming of the Bastille",
    description: "When French revolutionaries attacked a prison",
    category: "history",
  },
  {
    name: "The Partition of India",
    description: "When British India split into India and Pakistan",
    category: "history",
  },
  {
    name: "The Rwandan Genocide",
    description: "1994 mass killing in Africa that shocked the world",
    category: "history",
  },
  {
    name: "The First Flight",
    description: "When the Wright Brothers flew at Kitty Hawk",
    category: "history",
  },
  {
    name: "The Chernobyl Disaster",
    description: "When a Soviet nuclear reactor exploded",
    category: "history",
  },
  {
    name: "The Assassination of Archduke Franz Ferdinand",
    description: "The spark that started World War I",
    category: "history",
  },
  {
    name: "The Invention of the Printing Press",
    description: "When Gutenberg made books available to everyone",
    category: "history",
  },
  {
    name: "The Reign of Terror",
    description: "When the French Revolution started executing everyone",
    category: "history",
  },
  {
    name: "The Opium Wars",
    description: "When Britain forced China to accept drug trade",
    category: "history",
  },
  {
    name: "The Scramble for Africa",
    description: "When European powers divided up Africa",
    category: "history",
  },
  {
    name: "The Hiroshima Bombing",
    description: "First atomic bomb dropped on a city",
    category: "history",
  },

  // Geography (Places & Buildings)
  {
    name: "The Eiffel Tower",
    description: "Iron tower in Paris that looks like the letter A",
    category: "geography",
  },
  {
    name: "The Great Wall of China",
    description: "Ancient wall so big you can see it from space (maybe)",
    category: "geography",
  },
  {
    name: "The Colosseum",
    description: "Roman arena where gladiators fought to the death",
    category: "geography",
  },
  {
    name: "The Pyramids of Giza",
    description: "Giant triangular tombs built by ancient Egyptians",
    category: "geography",
  },
  {
    name: "The Statue of Liberty",
    description: "Giant green lady holding a torch in New York harbor",
    category: "geography",
  },
  {
    name: "Machu Picchu",
    description: "Lost Incan city hidden high in the Peruvian mountains",
    category: "geography",
  },
  {
    name: "The Taj Mahal",
    description: "White marble mausoleum built for love in India",
    category: "geography",
  },
  {
    name: "Big Ben",
    description: "Famous clock tower in London that goes bong",
    category: "geography",
  },
  {
    name: "The Leaning Tower of Pisa",
    description: "Italian tower that's been falling over for centuries",
    category: "geography",
  },
  {
    name: "Mount Everest",
    description: "Tallest mountain in the world, in the Himalayas",
    category: "geography",
  },
  {
    name: "The Grand Canyon",
    description: "Giant hole in Arizona carved by a river",
    category: "geography",
  },
  {
    name: "Niagara Falls",
    description: "Massive waterfalls on the US-Canada border",
    category: "geography",
  },
  {
    name: "The Amazon Rainforest",
    description: "World's largest jungle, lungs of the Earth",
    category: "geography",
  },
  {
    name: "The Sahara Desert",
    description: "Massive African desert full of sand dunes",
    category: "geography",
  },
  {
    name: "The Great Barrier Reef",
    description: "World's largest coral reef off Australia",
    category: "geography",
  },
  {
    name: "Stonehenge",
    description: "Mysterious circle of giant rocks in England",
    category: "geography",
  },
  {
    name: "The Vatican",
    description: "Tiny country inside Rome where the Pope lives",
    category: "geography",
  },
  {
    name: "The Bermuda Triangle",
    description: "Mysterious ocean area where ships disappear",
    category: "geography",
  },
  { name: "Mount Fuji", description: "Iconic snow-capped volcano in Japan", category: "geography" },
  {
    name: "The Sydney Opera House",
    description: "Australian building that looks like sailboats",
    category: "geography",
  },
  {
    name: "The Golden Gate Bridge",
    description: "Famous red suspension bridge in San Francisco",
    category: "geography",
  },
  {
    name: "Christ the Redeemer",
    description: "Giant Jesus statue overlooking Rio de Janeiro",
    category: "geography",
  },
  {
    name: "The Forbidden City",
    description: "Chinese emperor's palace complex in Beijing",
    category: "geography",
  },
  {
    name: "Petra",
    description: "Ancient city carved into pink rock in Jordan",
    category: "geography",
  },
  {
    name: "The Acropolis",
    description: "Ancient Greek ruins on a hill in Athens",
    category: "geography",
  },
  {
    name: "Area 51",
    description: "Secret US military base rumored to have aliens",
    category: "geography",
  },
  {
    name: "The Dead Sea",
    description: "Super salty lake where you float without trying",
    category: "geography",
  },
  {
    name: "Victoria Falls",
    description: "Massive waterfall in Africa, the smoke that thunders",
    category: "geography",
  },
  { name: "The Louvre", description: "Paris museum where Mona Lisa lives", category: "geography" },
  {
    name: "Angkor Wat",
    description: "Massive ancient temple complex in Cambodia",
    category: "geography",
  },
  {
    name: "The Kremlin",
    description: "Russian fortress in Moscow where Putin works",
    category: "geography",
  },
  {
    name: "The Panama Canal",
    description: "Shortcut for ships between Atlantic and Pacific",
    category: "geography",
  },
  {
    name: "Easter Island",
    description: "Remote island with giant stone head statues",
    category: "geography",
  },
  {
    name: "The Northern Lights",
    description: "Colorful lights dancing in Arctic skies",
    category: "geography",
  },
  {
    name: "The Mariana Trench",
    description: "Deepest point in the ocean, darker than space",
    category: "geography",
  },
  {
    name: "Hollywood",
    description: "LA neighborhood where movies are made",
    category: "geography",
  },
  {
    name: "The Sistine Chapel",
    description: "Vatican chapel with Michelangelo's ceiling painting",
    category: "geography",
  },
  {
    name: "Alcatraz",
    description: "Infamous prison island in San Francisco Bay",
    category: "geography",
  },
  {
    name: "The Great Sphinx",
    description: "Lion body, human head statue guarding the pyramids",
    category: "geography",
  },
  {
    name: "The Serengeti",
    description: "African savanna famous for animal migrations",
    category: "geography",
  },

  // Entertainment (Movies, TV, Music)
  {
    name: "The Beatles",
    description: "British band that invaded America, Yellow Submarine",
    category: "entertainment",
  },
  {
    name: "Game of Thrones",
    description: "Fantasy TV show where everyone dies and winter is coming",
    category: "entertainment",
  },
  {
    name: "Titanic (the movie)",
    description: "Jack and Rose, 'I'm the king of the world', that door debate",
    category: "entertainment",
  },
  {
    name: "The Office",
    description: "Mockumentary about a paper company, 'That's what she said'",
    category: "entertainment",
  },
  {
    name: "Star Wars",
    description: "Space opera with lightsabers, 'May the Force be with you'",
    category: "entertainment",
  },
  {
    name: "Friends",
    description: "Six friends in NYC, 'We were on a break!'",
    category: "entertainment",
  },
  {
    name: "The Godfather",
    description: "Mafia movie, 'I'm gonna make him an offer he can't refuse'",
    category: "entertainment",
  },
  {
    name: "Queen (the band)",
    description: "Rock band fronted by Freddie Mercury, We Will Rock You",
    category: "entertainment",
  },
  {
    name: "Breaking Bad",
    description: "Chemistry teacher becomes meth kingpin",
    category: "entertainment",
  },
  {
    name: "Jurassic Park",
    description: "Dinosaurs escape theme park, life finds a way",
    category: "entertainment",
  },
  {
    name: "Michael Jackson",
    description: "King of Pop, moonwalk, Thriller",
    category: "entertainment",
  },
  {
    name: "The Lion King",
    description: "Disney movie about a lion who can't wait to be king",
    category: "entertainment",
  },
  {
    name: "Stranger Things",
    description: "Kids in the 80s fight monsters from the Upside Down",
    category: "entertainment",
  },
  {
    name: "ABBA",
    description: "Swedish pop group, Mamma Mia, Dancing Queen",
    category: "entertainment",
  },
  {
    name: "The Avengers",
    description: "Marvel superhero team-up movies",
    category: "entertainment",
  },
  {
    name: "Seinfeld",
    description: "Show about nothing, four friends in New York",
    category: "entertainment",
  },
  {
    name: "Nirvana",
    description: "Grunge band, Smells Like Teen Spirit, Kurt Cobain",
    category: "entertainment",
  },
  {
    name: "The Wizard of Oz",
    description: "Dorothy follows the yellow brick road, 'There's no place like home'",
    category: "entertainment",
  },
  {
    name: "The Simpsons",
    description: "Yellow cartoon family, longest-running sitcom",
    category: "entertainment",
  },
  {
    name: "Pink Floyd",
    description: "Rock band, Dark Side of the Moon, The Wall",
    category: "entertainment",
  },
  {
    name: "Jaws",
    description: "Shark terrorizes beach town, 'You're gonna need a bigger boat'",
    category: "entertainment",
  },
  { name: "The Walking Dead", description: "Zombie apocalypse TV show", category: "entertainment" },
  {
    name: "Elvis Presley",
    description: "The King of Rock and Roll, hips that scandalized America",
    category: "entertainment",
  },
  {
    name: "Pulp Fiction",
    description: "Tarantino crime film, 'What does Marcellus Wallace look like?'",
    category: "entertainment",
  },
  {
    name: "The Rolling Stones",
    description: "Rock band with big lips logo, Mick Jagger",
    category: "entertainment",
  },
  {
    name: "The Matrix",
    description: "Red pill or blue pill, bullet time, 'There is no spoon'",
    category: "entertainment",
  },
  {
    name: "Beyoncé",
    description: "Queen Bey, Destiny's Child, Single Ladies",
    category: "entertainment",
  },
  {
    name: "Back to the Future",
    description: "Teen travels through time in a DeLorean",
    category: "entertainment",
  },
  { name: "Led Zeppelin", description: "Rock band, Stairway to Heaven", category: "entertainment" },
  {
    name: "The Shining",
    description: "Kubrick horror film, 'Here's Johnny!'",
    category: "entertainment",
  },
  {
    name: "Bob Marley",
    description: "Reggae legend, 'One Love', dreadlocks",
    category: "entertainment",
  },
  {
    name: "Forrest Gump",
    description: "Life is like a box of chocolates, ran across America",
    category: "entertainment",
  },
  {
    name: "AC/DC",
    description: "Hard rock band, Highway to Hell, Back in Black",
    category: "entertainment",
  },
  {
    name: "E.T. the Extra-Terrestrial",
    description: "Alien wants to phone home, flying bicycle scene",
    category: "entertainment",
  },
  {
    name: "Madonna",
    description: "Queen of Pop, Material Girl, Like a Virgin",
    category: "entertainment",
  },
  {
    name: "The Exorcist",
    description: "Horror movie about demon possession, spinning head",
    category: "entertainment",
  },
  {
    name: "U2",
    description: "Irish rock band, Bono, With or Without You",
    category: "entertainment",
  },
  {
    name: "Ghostbusters",
    description: "'Who you gonna call?', fighting ghosts in NYC",
    category: "entertainment",
  },
  {
    name: "Drake",
    description: "Canadian rapper, Started From the Bottom, Hotline Bling",
    category: "entertainment",
  },
  {
    name: "Squid Game",
    description: "Korean show where contestants die playing children's games",
    category: "entertainment",
  },

  // Fictional Characters
  {
    name: "Darth Vader",
    description: "Star Wars villain, Luke's father, heavy breather",
    category: "entertainment",
  },
  {
    name: "Harry Potter",
    description: "The boy who lived, has a lightning scar",
    category: "entertainment",
  },
  {
    name: "Shrek",
    description: "Green ogre who lives in a swamp, loves Fiona",
    category: "entertainment",
  },
  {
    name: "James Bond",
    description: "British spy, 007, shaken not stirred",
    category: "entertainment",
  },
  {
    name: "Batman",
    description: "Dark Knight of Gotham, has a butler named Alfred",
    category: "entertainment",
  },
  { name: "Elsa", description: "Frozen queen who let it go", category: "entertainment" },
  {
    name: "Homer Simpson",
    description: "Yellow cartoon dad who loves donuts and Duff beer",
    category: "entertainment",
  },
  {
    name: "Mario",
    description: "Italian plumber who saves Princess Peach",
    category: "entertainment",
  },
  {
    name: "Gollum",
    description: "Lord of the Rings creature obsessed with his precious",
    category: "entertainment",
  },
  {
    name: "SpongeBob SquarePants",
    description: "Yellow sponge who lives in a pineapple under the sea",
    category: "entertainment",
  },
  {
    name: "Sherlock Holmes",
    description: "Detective who says 'elementary, my dear Watson'",
    category: "entertainment",
  },
  {
    name: "Winnie the Pooh",
    description: "Bear who loves honey and has no pants",
    category: "entertainment",
  },
  {
    name: "The Joker",
    description: "Batman's nemesis, clown makeup, chaos agent",
    category: "entertainment",
  },
  {
    name: "Captain Jack Sparrow",
    description: "Drunk pirate who wants rum and the Black Pearl",
    category: "entertainment",
  },
  {
    name: "Cinderella",
    description: "Princess who lost her glass slipper at midnight",
    category: "entertainment",
  },
  { name: "Gandalf", description: "Wizard who shall not let you pass", category: "entertainment" },
  {
    name: "The Grinch",
    description: "Green creature who stole Christmas",
    category: "entertainment",
  },
  { name: "Pikachu", description: "Yellow electric mouse Pokémon", category: "entertainment" },
  {
    name: "Katniss Everdeen",
    description: "Hunger Games heroine, volunteers as tribute",
    category: "entertainment",
  },
  {
    name: "Yoda",
    description: "Small green Jedi master who talks backwards",
    category: "entertainment",
  },
  {
    name: "Wonder Woman",
    description: "Amazon warrior princess with a lasso of truth",
    category: "entertainment",
  },
  {
    name: "Scooby-Doo",
    description: "Mystery-solving dog who loves Scooby Snacks",
    category: "entertainment",
  },
  {
    name: "Thanos",
    description: "Purple villain who snapped half the universe away",
    category: "entertainment",
  },
  {
    name: "The Terminator",
    description: "Robot assassin from the future, 'I'll be back'",
    category: "entertainment",
  },
  {
    name: "Buzz Lightyear",
    description: "Space ranger toy, to infinity and beyond",
    category: "entertainment",
  },
  {
    name: "Hannibal Lecter",
    description: "Cannibal psychiatrist who ate a census taker",
    category: "entertainment",
  },
  {
    name: "Indiana Jones",
    description: "Archaeologist with a whip who hates snakes",
    category: "entertainment",
  },
  {
    name: "Dory",
    description: "Forgetful blue fish, just keep swimming",
    category: "entertainment",
  },
  {
    name: "The Cat in the Hat",
    description: "Troublemaking cat in a tall striped hat",
    category: "entertainment",
  },
  {
    name: "Hermione Granger",
    description: "Smartest witch at Hogwarts, it's LeviOsa",
    category: "entertainment",
  },
  {
    name: "King Kong",
    description: "Giant ape who climbed the Empire State Building",
    category: "entertainment",
  },
  {
    name: "Ron Burgundy",
    description: "Anchorman who stays classy San Diego",
    category: "entertainment",
  },
  {
    name: "Willy Wonka",
    description: "Eccentric chocolate factory owner",
    category: "entertainment",
  },
  { name: "The Hulk", description: "Green guy who smashes when angry", category: "entertainment" },
  {
    name: "Cruella de Vil",
    description: "Villain who wants to make a dalmatian coat",
    category: "entertainment",
  },
  {
    name: "Borat",
    description: "Kazakh journalist, very nice, great success",
    category: "entertainment",
  },
  {
    name: "Donkey",
    description: "Shrek's annoying best friend, wants waffles",
    category: "entertainment",
  },
  {
    name: "Simba",
    description: "Lion King who couldn't wait to be king",
    category: "entertainment",
  },
  {
    name: "Voldemort",
    description: "He who must not be named, no nose",
    category: "entertainment",
  },
  {
    name: "Groot",
    description: "Tree creature who only says 'I am Groot'",
    category: "entertainment",
  },
  {
    name: "Dorothy",
    description: "Kansas girl who followed the yellow brick road",
    category: "entertainment",
  },
  {
    name: "The Minions",
    description: "Yellow pill-shaped creatures who say 'banana'",
    category: "entertainment",
  },
]
