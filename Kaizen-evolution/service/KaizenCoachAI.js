// Service IA Coach Kaizen avec DeepSeek API
class KaizenCoachAI {
    constructor() {
        this.apiKey = this.loadApiKey();
        this.baseURL = 'https://api.deepseek.com/chat/completions';
        this.userProfile = this.loadUserProfile();
    }

    // Charge la clé API depuis le stockage local
    loadApiKey() {
        return localStorage.getItem('deepseek_api_key') || '';
    }

    // Sauvegarde la clé API
    saveApiKey(apiKey) {
        localStorage.setItem('deepseek_api_key', apiKey);
        this.apiKey = apiKey;
    }

    // Charge le profil utilisateur
    loadUserProfile() {
        return JSON.parse(localStorage.getItem('kaizenUserProfile') || '{}');
    }

    // Génère les actions quotidiennes personnalisées
    async generateDailyActions() {
        if (!this.apiKey) {
            throw new Error('Clé API DeepSeek non configurée. Veuillez ajouter votre clé dans les paramètres.');
        }

        const context = this.buildDailyContext();
        const prompt = this.buildCoachPrompt(context);
        
        try {
            const response = await this.callDeepSeekAPI(prompt);
            return this.parseAIResponse(response);
        } catch (error) {
            console.error('Erreur API DeepSeek:', error);
            return this.getFallbackActions();
        }
    }

    // Construit le contexte quotidien
    buildDailyContext() {
        const today = new Date().toISOString().split('T')[0];
        const userProgress = JSON.parse(localStorage.getItem('kaizenProgress') || '{}');
        
        return {
            date: today,
            domains: kaizenDomains,
            userProgress: userProgress[today] || {},
            energyLevel: this.getEnergyLevel(),
            availableTime: this.getAvailableTime(),
            recentChallenges: this.getRecentChallenges(),
            currentFocus: this.determineCurrentFocus(),
            lastActions: this.getLastCompletedActions()
        };
    }

    // Construit le prompt pour l'IA
    buildCoachPrompt(context) {
        return `
TU ES COACH KAIZEN EXPERT - PHILOSOPHIE : PETITES ACTIONS QUOTIDIENNES = GRANDS CHANGEMENTS

# CONTEXTE UTILISATEUR :
Nom : Vignimon DAKIMON MEDENOU
Lieu : Bénin
Énergie du jour : ${context.energyLevel}/10
Temps disponible : ${context.availableTime} minutes
Focus actuel : ${context.currentFocus}
Défis récents : ${context.recentChallenges}

# VISION À 5 ANS - DOMAINES KAIZEN :
${Object.values(kaizenDomains).map(domain => `
${domain.icon} ${domain.name} 
Objectif : ${domain.objective}
Vision : "${domain.kaizen_goal}"
`).join('')}

# PROGRÈS RÉCENTS :
${Object.keys(context.userProgress).length > 0 ? 
  `Dernières actions complétées : ${context.lastActions.map(action => action.description).join(', ')}` 
  : 'Aucune action complétée récemment - premier jour!'}

# BASE DE DONNÉES ACTIONS DISPONIBLES :
${Object.values(kaizenDomains).map(domain => {
  const program = domain.programs[Object.keys(domain.programs)[0]];
  return `
${domain.icon} ${domain.name} - ${program.name}
Actions disponibles : ${program.actions.map(a => 
  `${a.name} (${a.duration}min, difficulté: ${a.difficulty}/5) - ${a.description}`
).join(' | ')}`;
}).join('')}

# MISSION COACH KAIZEN AUJOURD'HUI :
Génère EXACTEMENT 3 actions Kaizen pour AUJOURD'HUI qui :
1. ✅ S'appuient sur les forces et progrès actuels
2. 🎯 Adressent les défis récents de manière constructive  
3. ⏱️ Respectent le niveau d'énergie (${context.energyLevel}/10) et temps disponible (${context.availableTime}min)
4. 🚀 Font progresser vers la vision à 5 ans par petits pas
5. 🌱 Suivent la philosophie Kaizen (progressivité, consistance, micro-actions)
6. 🇧🇯 Tiennent compte du contexte béninois (climat, culture, ressources)

# CRITÈRES DE QUALITÉ :
- Actions RÉALISABLES aujourd'hui même
- Durée totale des 3 actions < ${context.availableTime} minutes
- Difficulté adaptée à l'énergie ${context.energyLevel}/10
- Équilibre entre les domaines (ne pas négliger un domaine)
- Lien clair avec les objectifs long terme

# FORMAT DE RÉPONSE STRICT - 3 ACTIONS MAXIMUM :
💡 [DOMAINE] [ACTION SPÉCIFIQUE ET CONCRÈTE - durée estimée]
🎯 [POURQUOI CETTE ACTION MAINTENANT - 1 phrase contextuelle]
📈 [IMPACT - comment cette micro-action avance vers l'objectif final]
⭐ [DIFFICULTÉ ESTIMÉE - de ⭐☆☆☆☆ à ⭐⭐⭐⭐⭐]

Exemple valide :
💡 Corps & Énergie : Respiration consciente avant déjeuner - 3 minutes
🎯 Ton énergie est moyenne aujourd'hui, parfait pour cette pratique douce qui recharge
📈 Améliore la conscience corporelle et prépare à une alimentation plus mindful
⭐ ⭐ ☆ ☆ ☆

MAINTENANT, GÉNÈRE 3 ACTIONS POUR AUJOURD'HUI :
        `;
    }

    // Appel à l'API DeepSeek
    async callDeepSeekAPI(prompt) {
        const response = await fetch(this.baseURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.apiKey}`
            },
            body: JSON.stringify({
                model: 'deepseek-chat',
                messages: [{ 
                    role: 'user', 
                    content: prompt 
                }],
                temperature: 0.7,
                max_tokens: 1500
            })
        });
        
        if (!response.ok) {
            throw new Error(`Erreur API: ${response.status} - ${await response.text()}`);
        }
        
        const data = await response.json();
        return data.choices[0].message.content;
    }

    // Parse la réponse de l'IA
    parseAIResponse(response) {
        const actions = [];
        const lines = response.split('\n').filter(line => line.trim());
        
        let currentAction = {};
        
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i].trim();
            
            if (line.startsWith('💡')) {
                // Nouvelle action
                if (Object.keys(currentAction).length > 0) {
                    actions.push(currentAction);
                }
                currentAction = {
                    domain: line.split(' : ')[0].replace('💡 ', ''),
                    description: line.split(' : ')[1] || line,
                    reasoning: '',
                    impact: '',
                    difficulty: '⭐⭐⭐☆☆'
                };
            } else if (line.startsWith('🎯') && currentAction.domain) {
                currentAction.reasoning = line.replace('🎯 ', '');
            } else if (line.startsWith('📈') && currentAction.domain) {
                currentAction.impact = line.replace('📈 ', '');
            } else if (line.startsWith('⭐') && currentAction.domain) {
                currentAction.difficulty = line.replace('⭐ ', '');
            }
        }
        
        // Ajouter la dernière action
        if (Object.keys(currentAction).length > 0) {
            actions.push(currentAction);
        }
        
        // S'assurer d'avoir exactement 3 actions
        while (actions.length < 3) {
            actions.push(this.generateFallbackAction(actions.length));
        }
        
        return actions.slice(0, 3);
    }

    // Actions de secours
    getFallbackActions() {
        return [
            this.generateFallbackAction(0),
            this.generateFallbackAction(1),
            this.generateFallbackAction(2)
        ];
    }

    generateFallbackAction(index) {
        const fallbackActions = [
            {
                domain: "Corps & Énergie",
                description: "Respiration consciente - 3 minutes",
                reasoning: "Recentrage et préparation à la journée",
                impact: "Améliore concentration et gestion du stress",
                difficulty: "⭐☆☆☆☆"
            },
            {
                domain: "Identité & Esprit", 
                description: "Noter 1 qualité à développer aujourd'hui - 2 minutes",
                reasoning: "Renforcement de l'identité souhaitée",
                impact: "Construction progressive de la confiance",
                difficulty: "⭐☆☆☆☆"
            },
            {
                domain: "Savoir & Compétences",
                description: "Lecture rapide article technique - 10 minutes",
                reasoning: "Entretien de la curiosité et des connaissances",
                impact: "Maintien de l'expertise et ouverture d'esprit",
                difficulty: "⭐⭐☆☆☆"
            }
        ];
        
        return fallbackActions[index] || fallbackActions[0];
    }

    // Méthodes utilitaires
    getEnergyLevel() {
        const select = document.getElementById('energy-level');
        return select ? parseInt(select.value) : 5;
    }

    getAvailableTime() {
        const select = document.getElementById('available-time');
        return select ? parseInt(select.value) : 60;
    }

    getRecentChallenges() {
        const progress = JSON.parse(localStorage.getItem('kaizenProgress') || '{}');
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayKey = yesterday.toISOString().split('T')[0];
        
        if (progress[yesterdayKey] && progress[yesterdayKey].challenges) {
            return progress[yesterdayKey].challenges.join(', ');
        }
        
        return "Aucun défi spécifique rapporté";
    }

    determineCurrentFocus() {
        // Détermine le focus basé sur les progrès récents
        const progress = JSON.parse(localStorage.getItem('kaizenProgress') || '{}');
        const domainsProgress = {};
        
        Object.keys(progress).forEach(date => {
            progress[date].completed.forEach(action => {
                const domain = Object.values(kaizenDomains).find(d => 
                    action.domain.includes(d.name)
                );
                if (domain) {
                    domainsProgress[domain.id] = (domainsProgress[domain.id] || 0) + 1;
                }
            });
        });
        
        // Trouve le domaine le moins travaillé
        const leastWorked = Object.keys(domainsProgress).reduce((least, domain) => {
            return domainsProgress[domain] < domainsProgress[least] ? domain : least;
        }, Object.keys(domainsProgress)[0]);
        
        return leastWorked ? kaizenDomains[leastWorked].name : "Équilibre général";
    }

    getLastCompletedActions() {
        const progress = JSON.parse(localStorage.getItem('kaizenProgress') || '{}');
        const dates = Object.keys(progress).sort().reverse();
        const lastActions = [];
        
        for (let date of dates.slice(0, 3)) { // 3 derniers jours
            lastActions.push(...progress[date].completed);
        }
        
        return lastActions.slice(0, 5); // 5 dernières actions max
    }

    // Chat avec le coach
    async chatWithCoach(userMessage, conversationHistory = []) {
        if (!this.apiKey) {
            return "Veuillez d'abord configurer votre clé API DeepSeek dans les paramètres.";
        }

        const prompt = `
CONVERSATION AVEC COACH KAIZEN - CONTEXTE :

Utilisateur : Vignimon DAKIMON MEDENOU
Objectif : Devenir un homme équilibré, construire une entreprise durable, et progresser dans 6 domaines de vie
Philosophie : Kaizen - amélioration continue par petits pas

HISTORIQUE RÉCENT :
${conversationHistory.slice(-5).map(msg => 
    `${msg.role === 'user' ? 'Vignimon' : 'Coach'}: ${msg.content}`
).join('\n')}

MESSAGE ACTUEL DE VIGNIMON :
"${userMessage}"

TA MISSION EN TANT QUE COACH KAIZEN :
- Répondre avec bienveillance et expertise
- Appliquer les principes Kaizen (petits pas, progressivité)
- Proposer des solutions pratiques et réalisables
- Encourager et motiver
- Rester concentré sur les objectifs à long terme

FORMAT DE RÉPONSE :
- Maximum 5-6 lignes
- Ton chaleureux mais professionnel
- Conseils concrets et actionnables
- Lien avec la philosophie Kaizen

RÉPONDS MAINTENANT :
        `;

        try {
            const response = await fetch(this.baseURL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.apiKey}`
                },
                body: JSON.stringify({
                    model: 'deepseek-chat',
                    messages: [{ role: 'user', content: prompt }],
                    temperature: 0.8,
                    max_tokens: 500
                })
            });
            
            const data = await response.json();
            return data.choices[0].message.content;
        } catch (error) {
            return "Désolé, je ne peux pas répondre pour le moment. Vérifiez votre connexion et votre clé API.";
        }
    }
}

// Export pour utilisation globale
window.KaizenCoachAI = KaizenCoachAI;