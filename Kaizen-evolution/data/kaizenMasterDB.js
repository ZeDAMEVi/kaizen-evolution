// Base de données complète des domaines Kaizen
const kaizenDomains = {
  "identite_esprit": {
    id: "identite_esprit",
    name: "Identité & Esprit",
    color: "#9C27B0",
    icon: "🧠",
    objective: "Devenir un homme confiant, discipliné, calme et fort intérieurement",
    kaizen_goal: "Je deviens un homme équilibré, souverain et en paix avec lui-même",
    
    programs: {
      "transformation_interieure_90j": {
        name: "Transformation Intérieure - 90 jours",
        description: "Développement de la confiance, discipline et paix intérieure",
        actions: [
          {
            id: "meditation_matinale",
            name: "Méditation du matin - 5 minutes",
            description: "Respiration consciente et ancrage dans le moment présent",
            duration: 5,
            difficulty: 2,
            frequency: "quotidien",
            trigger: "au réveil",
            kaizen_principle: "micro-habitude",
            benefits: ["calme", "clarté", "centrage"],
            template: "Asseyez-vous confortablement. Respirez profondément 10 fois. Observez vos pensées sans jugement."
          },
          {
            id: "journal_gratitude",
            name: "Journal de gratitude - 3 points",
            description: "Noter 3 choses pour lesquelles je suis reconnaissant",
            duration: 3,
            difficulty: 1,
            frequency: "quotidien", 
            trigger: "soir avant coucher",
            kaizen_principle: "focus positif",
            benefits: ["positivité", "reconnaissance", "paix"],
            template: "1. [Personne/relation]\n2. [Événement/expérience]\n3. [Qualité personnelle]"
          },
          {
            id: "visualisation_homme_ideal",
            name: "Visualisation homme idéal - 2 minutes", 
            description: "Visualiser la version de moi-même que je veux devenir",
            duration: 2,
            difficulty: 2,
            frequency: "quotidien",
            trigger: "avant méditation",
            kaizen_principle: "programmation mentale",
            benefits: ["clarté", "motivation", "alignement"],
            template: "Fermez les yeux. Visualisez-vous avec confiance, calme et force. Quel est votre langage corporel? Comment parlez-vous? Comment réagissez-vous aux défis?"
          },
          {
            id: "affirmation_positive",
            name: "Affirmation positive - 1 minute",
            description: "Répéter une affirmation alignée avec mon identité souhaitée",
            duration: 1,
            difficulty: 1,
            frequency: "quotidien",
            trigger: "après le réveil",
            kaizen_principle: "réprogrammation",
            benefits: ["confiance", "estime", "focus"],
            template: "Je suis un homme calme, confiant et maître de mes émotions."
          }
        ]
      }
    }
  },

  "oeuvre_mission": {
    id: "oeuvre_mission", 
    name: "Œuvre & Mission",
    color: "#2196F3",
    icon: "🚀",
    objective: "Créer et diriger une entreprise dans les énergies renouvelables",
    kaizen_goal: "Je bâtis une entreprise durable qui incarne mon engagement",
    
    programs: {
      "lancement_entreprise_12mois": {
        name: "Lancement Entreprise - 12 mois",
        description: "Développement progressif de l'entreprise énergies renouvelables",
        actions: [
          {
            id: "etude_marche_quotidien",
            name: "Étude marché - 15 minutes",
            description: "Analyser 1 segment client ou concurrent",
            duration: 15,
            difficulty: 3,
            frequency: "quotidien",
            trigger: "matin travail",
            kaizen_principle: "apprentissage continu",
            benefits: ["connaissance marché", "innovation", "positionnement"],
            template: "Recherchez : 1. Besoins clients non-satisfaits 2. Tendances du secteur 3. Opportunités locales"
          },
          {
            id: "reseau_1_contact",
            name: "Réseau - 1 contact stratégique", 
            description: "Contacter 1 personne du secteur énergies renouvelables",
            duration: 10,
            difficulty: 4,
            frequency: "hebdomadaire",
            trigger: "vendredi matin",
            kaizen_principle: "relations qualité",
            benefits: ["opportunités", "mentorat", "collaborations"],
            template: "Message LinkedIn : 'Bonjour [Nom], j'admire votre travail sur [projet]. Je développe [votre projet] et j'aimerais échanger sur [sujet spécifique].'"
          },
          {
            id: "development_competence_technique",
            name: "Développement compétence technique - 20 minutes",
            description: "Apprentissage actif en énergies renouvelables ou mécatronique",
            duration: 20,
            difficulty: 3,
            frequency: "quotidien",
            trigger: "soir étude",
            kaizen_principle: "expertise progressive",
            benefits: ["savoir-faire", "innovation", "credibilité"],
            template: "Sujets : Dimensionnement PV, systèmes hybrides, IoT pour énergie, prototypage"
          }
        ]
      }
    }
  },

  "corps_energie": {
    id: "corps_energie",
    name: "Corps & Énergie", 
    color: "#4CAF50",
    icon: "💪",
    objective: "Perdre l'excès de gras et développer un corps fort, souple et endurant",
    kaizen_goal: "Je sculpte un corps sain et puissant, reflet de ma discipline intérieure",
    
    programs: {
      "transformation_90j": {
        name: "Transformation Corps - 90 jours",
        description: "Protocole complet nutrition et sport adapté contexte béninois",
        actions: [
          {
            id: "circuit_15min",
            name: "Circuit training - 15 minutes",
            description: "Pompes, squats, gainage - protocole Kaizen progressif",
            duration: 15,
            difficulty: 3,
            frequency: "5j/semaine",
            trigger: "6h30 matin",
            kaizen_principle: "progressivité",
            benefits: ["force", "endurance", "métabolisme"],
            template: "Échauffement 2min → Pompes 8 reps → Squats 15 reps → Gainage 20s → Mountain climbers 20s → Repos 1min → Répéter 3 cycles"
          },
          {
            id: "alimentation_consciente",
            name: "Alimentation consciente - 1 repas",
            description: "Un repas respectant le plan nutritionnel béninois",
            duration: 20,
            difficulty: 2,
            frequency: "quotidien",
            trigger: "chaque repas",
            kaizen_principle: "conscience alimentaire", 
            benefits: ["santé", "énergie", "poids"],
            template: "Assiette idéale : 1/2 légumes, 1/4 protéines (poisson, œufs, haricot), 1/4 glucides complets (riz, igname, maïs)"
          },
          {
            id: "hydratation_optimale",
            name: "Hydratation - 2L d'eau",
            description: "Suivi de la consommation d'eau pendant la journée",
            duration: 1,
            difficulty: 1,
            frequency: "quotidien",
            trigger: "toute la journée",
            kaizen_principle: "fondation santé",
            benefits: ["énergie", "métabolisme", "récupération"],
            template: "Bouteille de 1L → Boire 1 avant 12h, 1 avant 18h. Ajouter citron/pastèque pour varier."
          },
          {
            id: "etirements_posturaux",
            name: "Étirements posturaux - 5 minutes",
            description: "Correction posture et mobilité articulaire",
            duration: 5,
            difficulty: 1,
            frequency: "quotidien",
            trigger: "soir avant douche",
            kaizen_principle: "prévention",
            benefits: ["posture", "mobilité", "douleurs"],
            template: "Étirements : cou, épaules, dos, hanches. Tenir chaque position 30 secondes."
          }
        ]
      }
    }
  },

  "conscience_relations": {
    id: "conscience_relations",
    name: "Conscience & Relations",
    color: "#FF9800", 
    icon: "🙏",
    objective: "Entretenir une relation profonde avec Dieu et cultiver des relations saines",
    kaizen_goal: "Je marche dans la foi, la gratitude et la maîtrise émotionnelle",
    
    programs: {
      "paix_interieure_90j": {
        name: "Paix Intérieure - 90 jours", 
        description: "Développement spirituel et relations harmonieuses",
        actions: [
          {
            id: "priere_meditation",
            name: "Prière et connexion spirituelle - 10 minutes",
            description: "Temps de prière, lecture spirituelle ou méditation profonde",
            duration: 10,
            difficulty: 2,
            frequency: "quotidien",
            trigger: "soirée calme",
            kaizen_principle: "connexion divine",
            benefits: ["paix", "foi", "guidance"],
            template: "Merci pour [3 bénédictions]. Demande guidance pour [1 défi]. Écoute silence 2 minutes."
          },
          {
            id: "communication_consciente",
            name: "Communication consciente - 1 interaction",
            description: "Une interaction où j'écoute plus que je parle",
            duration: 5,
            difficulty: 3,
            frequency: "quotidien", 
            trigger: "rencontres quotidiennes",
            kaizen_principle: "écoute active",
            benefits: ["relations", "compréhension", "harmonie"],
            template: "Écouter sans interrompre. Poser 1 question ouverte. Reformuler ce que j'ai compris."
          },
          {
            id: "patience_pratique",
            name: "Pratique de la patience - 1 situation",
            description: "Gérer délibérément une situation frustrante avec calme",
            duration: 2,
            difficulty: 4,
            frequency: "quotidien",
            trigger: "quand frustration surgit",
            kaizen_principle: "maîtrise émotionnelle",
            benefits: ["calme", "maturité", "relations"],
            template: "Respirer profondément 3 fois. Me demander : 'Est-ce important dans 1 an?' Choisir réponse constructive."
          }
        ]
      }
    }
  },

  "finances_ressources": {
    id: "finances_ressources",
    name: "Finances & Ressources",
    color: "#FFC107",
    icon: "💰", 
    objective: "Atteindre l'indépendance financière progressive",
    kaizen_goal: "Je deviens un bâtisseur prospère, stable et maître de ses ressources",
    
    programs: {
      "autonomie_financiere_12mois": {
        name: "Autonomie Financière - 12 mois",
        description: "Développement progressif des revenus et gestion rigoureuse",
        actions: [
          {
            id: "suivi_depenses",
            name: "Suivi dépenses - 5 minutes", 
            description: "Noter toutes les dépenses de la journée",
            duration: 5,
            difficulty: 2,
            frequency: "quotidien",
            trigger: "soir avant coucher",
            kaizen_principle: "conscience financière",
            benefits: ["maîtrise", "économie", "planification"],
            template: "Catégories : Nourriture, Transport, Business, Personnel. Noter chaque dépense > 500 FCFA"
          },
          {
            id: "planification_revenus",
            name: "Planification revenus - 10 minutes",
            description: "Étudier 1 source de revenus additionnelle",
            duration: 10,
            difficulty: 3,
            frequency: "hebdomadaire",
            trigger: "dimanche soir",
            kaizen_principle: "création richesse",
            benefits: ["abondance", "sécurité", "croissance"],
            template: "Idées : Consulting énergie, Formation technique, Vente kits solaires, Partenariats ONG"
          },
          {
            id: "education_financiere",
            name: "Éducation financière - 15 minutes",
            description: "Apprentissage concepts finances personnelles et investissement",
            duration: 15,
            difficulty: 3,
            frequency: "hebdomadaire",
            trigger: "samedi matin",
            kaizen_principle: "savoir financier",
            benefits: ["décisions", "croissance", "sécurité"],
            template: "Sujets : Épargne automatique, Investissement progressif, Gestion dette, Calcul ROI"
          }
        ]
      }
    }
  },

  "savoir_competences": {
    id: "savoir_competences", 
    name: "Savoir & Compétences",
    color: "#00BCD4",
    icon: "📚",
    objective: "Apprentissage continu en énergies renouvelables et développement personnel",
    kaizen_goal: "Je deviens un esprit curieux et ingénieux, toujours en évolution",
    
    programs: {
      "master_autodidacte_12mois": {
        name: "Master Autodidacte - 12 mois",
        description: "Parcours d'apprentissage structuré menant à l'expertise",
        actions: [
          {
            id: "lecture_technique",
            name: "Lecture technique - 20 minutes",
            description: "Étude documentation énergies renouvelables ou mécatronique",
            duration: 20,
            difficulty: 3,
            frequency: "quotidien",
            trigger: "matin étude",
            kaizen_principle: "expertise progressive",
            benefits: ["savoir", "innovation", "compétence"],
            template: "Sources : Cours en ligne, Documentation technique, Articles recherche, Normes IEC"
          },
          {
            id: "pratique_competence", 
            name: "Pratique compétence - 15 minutes",
            description: "Exercice pratique (Python, conception, prototypage)",
            duration: 15,
            difficulty: 4,
            frequency: "quotidien",
            trigger: "soir créatif",
            kaizen_principle: "apprentissage appliqué",
            benefits: ["maîtrise", "création", "confiance"],
            template: "Projets : Script dimensionnement PV, Conception circuit, Simulation système, Prototype Arduino"
          },
          {
            id: "veille_technologique",
            name: "Veille technologique - 10 minutes",
            description: "Suivi des innovations énergies renouvelables Afrique",
            duration: 10,
            difficulty: 2,
            frequency: "quotidien",
            trigger: "pause déjeuner",
            kaizen_principle: "innovation continue",
            benefits: ["actualisation", "opportunités", "inspiration"],
            template: "Sources : LinkedIn experts, Sites spécialisés, Rapports IRENA, Blogs techniques"
          }
        ]
      }
    }
  }
};

// Export pour utilisation dans d'autres fichiers
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { kaizenDomains };
}