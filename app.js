// Application principale Kaizen Evolution
class KaizenEvolutionApp {
    constructor() {
        this.coachAI = new KaizenCoachAI();
        this.currentActions = [];
        this.userProgress = this.loadProgress();
        this.conversationHistory = [];
        this.initializeApp();
    }

    // Initialisation de l'application
    initializeApp() {
        this.renderDomains();
        this.setupEventListeners();
        this.updateProgressDisplay();
        this.checkApiKey();
        
        // Charger les actions du jour si elles existent
        const today = new Date().toISOString().split('T')[0];
        if (!this.userProgress[today] || this.userProgress[today].generatedActions) {
            this.loadDailyActions();
        } else {
            this.displayExistingActions();
        }
    }

    // Vérifie la présence de la clé API
    checkApiKey() {
        if (!this.coachAI.apiKey) {
            document.getElementById('api-config').style.display = 'block';
        } else {
            document.getElementById('api-config').style.display = 'none';
        }
    }

    // Affiche les domaines Kaizen
    renderDomains() {
        const domainsGrid = document.getElementById('domains-grid');
        domainsGrid.innerHTML = '';
        
        Object.values(kaizenDomains).forEach(domain => {
            const domainProgress = this.calculateDomainProgress(domain.id);
            
            const domainCard = `
                <div class="domain-card" style="border-left-color: ${domain.color};">
                    <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem;">
                        <span style="font-size: 1.5rem;">${domain.icon}</span>
                        <h3 style="margin: 0; font-size: 1.1rem;">${domain.name}</h3>
                    </div>
                    <p style="font-size: 0.8rem; color: #666; margin-bottom: 0.5rem;">${domain.kaizen_goal}</p>
                    
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${domainProgress}%; background: ${domain.color};"></div>
                    </div>
                    <small style="color: #666;">Progrès: ${domainProgress}%</small>
                </div>
            `;
            
            domainsGrid.innerHTML += domainCard;
        });
    }

    // Charge les actions quotidiennes
    async loadDailyActions() {
        document.getElementById('loading-actions').style.display = 'block';
        document.getElementById('generated-actions').style.display = 'none';
        document.getElementById('generate-actions').disabled = true;
        
        try {
            this.currentActions = await this.coachAI.generateDailyActions();
            this.saveGeneratedActions();
            this.renderDailyActions();
        } catch (error) {
            console.error('Erreur génération actions:', error);
            this.currentActions = this.coachAI.getFallbackActions();
            this.renderDailyActions();
            this.showNotification('Utilisation du mode secours - configurez votre clé API pour des recommandations personnalisées', 'warning');
        }
        
        document.getElementById('generate-actions').disabled = false;
    }

    // Affiche les actions existantes
    displayExistingActions() {
        const today = new Date().toISOString().split('T')[0];
        if (this.userProgress[today] && this.userProgress[today].generatedActions) {
            this.currentActions = this.userProgress[today].generatedActions;
            this.renderDailyActions();
        }
    }

    // Sauvegarde les actions générées
    saveGeneratedActions() {
        const today = new Date().toISOString().split('T')[0];
        if (!this.userProgress[today]) {
            this.userProgress[today] = { completed: [], generatedActions: [] };
        }
        this.userProgress[today].generatedActions = this.currentActions;
        this.saveProgress();
    }

    // Affiche les actions quotidiennes
    renderDailyActions() {
        const container = document.getElementById('generated-actions');
        document.getElementById('loading-actions').style.display = 'none';
        container.style.display = 'block';
        
        if (this.currentActions.length === 0) {
            container.innerHTML = '<p>Aucune action générée pour aujourd\'hui.</p>';
            return;
        }
        
        container.innerHTML = this.currentActions.map((action, index) => `
            <div class="action-item" style="border-left-color: ${this.getDomainColor(action.domain)};" id="action-${index}">
                <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 1rem;">
                    <div style="flex: 1;">
                        <strong>${action.description}</strong>
                        <p style="margin: 0.5rem 0; font-size: 0.9rem; color: #555;">${action.reasoning}</p>
                        <small style="color: #666;">${action.impact}</small>
                        <div style="margin-top: 0.5rem; font-size: 0.9rem;">${action.difficulty}</div>
                    </div>
                    <div style="flex-shrink: 0;">
                        <button onclick="app.markActionCompleted(${index})" class="outline" id="action-btn-${index}">
                            ✅ Terminer
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
    }

    // Marque une action comme complétée
    markActionCompleted(actionIndex) {
        const action = this.currentActions[actionIndex];
        const today = new Date().toISOString().split('T')[0];
        
        if (!this.userProgress[today]) {
            this.userProgress[today] = { completed: [], generatedActions: this.currentActions };
        }
        
        // Vérifie si l'action n'est pas déjà complétée
        const alreadyCompleted = this.userProgress[today].completed.some(
            completedAction => completedAction.description === action.description
        );
        
        if (!alreadyCompleted) {
            this.userProgress[today].completed.push({
                ...action,
                completedAt: new Date().toISOString(),
                completed: true
            });
            
            this.saveProgress();
            this.updateProgressDisplay();
            
            // Animation de confirmation
            const actionElement = document.getElementById(`action-${actionIndex}`);
            const actionButton = document.getElementById(`action-btn-${actionIndex}`);
            
            if (actionElement && actionButton) {
                actionElement.classList.add('completed-action');
                actionButton.textContent = '✅ Fait!';
                actionButton.disabled = true;
                
                this.showNotification('Action complétée ! +1% de progression Kaizen', 'success');
            }
            
            // Vérifie si toutes les actions sont complétées
            this.checkAllActionsCompleted();
        }
    }

    // Vérifie si toutes les actions sont complétées
    checkAllActionsCompleted() {
        const today = new Date().toISOString().split('T')[0];
        const todayProgress = this.userProgress[today];
        
        if (todayProgress && todayProgress.completed.length >= 3) {
            this.showNotification('🎉 Bravo ! Vous avez complété toutes vos actions Kaizen aujourd\'hui !', 'success');
        }
    }

    // Calcule la progression par domaine
    calculateDomainProgress(domainId) {
        const today = new Date().toISOString().split('T')[0];
        const todayProgress = this.userProgress[today];
        
        if (!todayProgress) return 0;
        
        const domain = kaizenDomains[domainId];
        const domainActions = todayProgress.completed.filter(
            action => action.domain.includes(domain.name)
        );
        
        return Math.min(100, (domainActions.length / 3) * 100);
    }

    // Met à jour l'affichage de progression
    updateProgressDisplay() {
        const today = new Date().toISOString().split('T')[0];
        const todayProgress = this.userProgress[today];
        
        let completedCount = 0;
        let totalScore = 0;
        let dayCount = 0;
        
        if (todayProgress) {
            completedCount = todayProgress.completed.length;
            const score = Math.min(100, (completedCount / 3) * 100);
            
            document.getElementById('daily-score').textContent = `${Math.round(score)}%`;
            document.getElementById('overall-progress').value = score;
            document.getElementById('completed-actions').textContent = completedCount;
        }
        
        // Calcul du score moyen et streak
        Object.keys(this.userProgress).forEach(date => {
            const dayProgress = this.userProgress[date];
            if (dayProgress.completed.length > 0) {
                totalScore += Math.min(100, (dayProgress.completed.length / 3) * 100);
                dayCount++;
            }
        });
        
        const averageScore = dayCount > 0 ? Math.round(totalScore / dayCount) : 0;
        document.getElementById('average-score').textContent = `${averageScore}%`;
        
        const streak = this.calculateStreak();
        document.getElementById('current-streak').textContent = `${streak} jour${streak > 1 ? 's' : ''}`;
        
        this.renderDomains(); // Re-rendre les domaines pour mettre à jour les progressions
    }

    // Calcule le streak actuel
    calculateStreak() {
        let streak = 0;
        const dates = Object.keys(this.userProgress).sort().reverse();
        const today = new Date().toISOString().split('T')[0];
        
        // Vérifier aujourd'hui d'abord
        if (this.userProgress[today] && this.userProgress[today].completed.length > 0) {
            streak++;
        } else {
            return 0;
        }
        
        // Vérifier les jours précédents
        for (let i = 1; i < dates.length; i++) {
            const date = dates[i];
            if (this.userProgress[date].completed.length > 0) {
                // Vérifier si c'est le jour précédent
                const currentDate = new Date(date);
                const previousDate = new Date(dates[i-1]);
                const diffTime = Math.abs(previousDate - currentDate);
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                
                if (diffDays === 1) {
                    streak++;
                } else {
                    break;
                }
            } else {
                break;
            }
        }
        
        return streak;
    }

    // Obtient la couleur d'un domaine
    getDomainColor(domainName) {
        const domain = Object.values(kaizenDomains).find(
            d => domainName.includes(d.name)
        );
        return domain ? domain.color : '#666';
    }

    // Configure les écouteurs d'événements
    setupEventListeners() {
        // Changement d'énergie ou temps disponible
        document.getElementById('energy-level').addEventListener('change', () => {
            this.showNotification('Paramètre énergie mis à jour', 'info');
        });
        
        document.getElementById('available-time').addEventListener('change', () => {
            this.showNotification('Paramètre temps mis à jour', 'info');
        });
        
        // Touche Entrée dans le chat
        document.getElementById('chat-input').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                sendMessageToCoach();
            }
        });
    }

    // Affiche une notification
    showNotification(message, type = 'info') {
        // Créer une notification simple
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#d4edda' : type === 'warning' ? '#fff3cd' : '#d1ecf1'};
            border: 1px solid ${type === 'success' ? '#c3e6cb' : type === 'warning' ? '#ffeaa7' : '#bee5eb'};
            color: ${type === 'success' ? '#155724' : type === 'warning' ? '#856404' : '#0c5460'};
            padding: 12px 20px;
            border-radius: 4px;
            z-index: 1000;
            max-width: 300px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        `;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 4000);
    }

    // Gestion des données
    loadProgress() {
        try {
            return JSON.parse(localStorage.getItem('kaizenProgress') || '{}');
        } catch (e) {
            console.error('Erreur chargement progression:', e);
            return {};
        }
    }

    saveProgress() {
        try {
            localStorage.setItem('kaizenProgress', JSON.stringify(this.userProgress));
        } catch (e) {
            console.error('Erreur sauvegarde progression:', e);
        }
    }
}

// Fonctions globales pour l'interface
async function generateNewActions() {
    await app.loadDailyActions();
}

async function sendMessageToCoach() {
    const input = document.getElementById('chat-input');
    const message = input.value.trim();
    
    if (!message) return;
    
    const chatMessages = document.getElementById('chat-messages');
    
    // Message utilisateur
    chatMessages.innerHTML += `
        <div class="message user">
            <strong>Vous:</strong> ${message}
        </div>
    `;
    
    input.value = '';
    chatMessages.scrollTop = chatMessages.scrollHeight;
    
    // Ajouter à l'historique
    app.conversationHistory.push({ role: 'user', content: message });
    
    // Réponse du coach
    try {
        const response = await app.coachAI.chatWithCoach(message, app.conversationHistory);
        
        chatMessages.innerHTML += `
            <div class="message coach">
                <strong>Coach Kaizen:</strong> ${response}
            </div>
        `;
        
        app.conversationHistory.push({ role: 'assistant', content: response });
        chatMessages.scrollTop = chatMessages.scrollHeight;
    } catch (error) {
        chatMessages.innerHTML += `
            <div class="message coach">
                <strong>Coach Kaizen:</strong> Désolé, je rencontre des difficultés techniques. Vérifiez votre connexion et votre clé API.
            </div>
        `;
    }
}

function saveApiKey() {
    const apiKeyInput = document.getElementById('api-key-input');
    const apiKey = apiKeyInput.value.trim();
    
    if (apiKey) {
        app.coachAI.saveApiKey(apiKey);
        app.checkApiKey();
        app.showNotification('Clé API sauvegardée avec succès !', 'success');
        apiKeyInput.value = '';
        
        // Recharger les actions avec la nouvelle clé
        setTimeout(() => {
            generateNewActions();
        }, 1000);
    } else {
        app.showNotification('Veuillez entrer une clé API valide', 'warning');
    }
}

// Initialisation de l'application
const app = new KaizenEvolutionApp();

// Service Worker pour PWA (basique)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then((registration) => {
                console.log('SW registered: ', registration);
            })
            .catch((registrationError) => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// Gestion de l'installation PWA
let deferredPrompt;
window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    
    // Montrer un bouton d'installation si désiré
    console.log('PWA prête à être installée');
});