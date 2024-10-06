# Makefile for automating deployment of frontend and backend services

# Variables
REPO_URL=https://github.com/J93es/j93es-blog.git
PROJECT_DIR=/srv/j93es-blog/j93es-blog
FRONTEND_DIR=$(PROJECT_DIR)/frontend
BACKEND_DIR=$(PROJECT_DIR)/backend
ENV_DIR=/srv/j93es-blog/env

# Targets
.PHONY: all update build-frontend build-backend deploy deploy-frontend deploy-backend restart-nginx start-pm2 stop-pm2

# 1. Clone or update the repository
update:
	if [ ! -d "$(PROJECT_DIR)" ]; then \
		sudo git clone $(REPO_URL) $(PROJECT_DIR); \
	else \
		cd $(PROJECT_DIR) && if sudo git pull | grep -q "Already up to date."; then \
			echo "No changes to update. Exiting..."; \
			exit 1; \
		fi; \
	fi

# 2. Install dependencies and build frontend
build-frontend:
	sudo cp $(ENV_DIR)/frontend $(FRONTEND_DIR)/.env && cd $(FRONTEND_DIR) && sudo npm install && sudo npm run build

# 3. Install dependencies for backend and start with PM2
build-backend:
	sudo cp $(ENV_DIR)/backend $(BACKEND_DIR)/.env && cd $(BACKEND_DIR) && sudo npm install && sudo npm run build

# 4. Stop and restart backend service with PM2
stop-pm2:
	sudo pm2 stop j93es-blog-backend || true && sudo pm2 delete j93es-blog-backend || true

start-pm2:
	cd $(BACKEND_DIR) && sudo pm2 start npm --name j93es-blog-backend -- run start

save-pm2:
	sudo pm2 save

# 5. Reload Nginx to apply new configuration
restart-nginx:
	sudo systemctl reload nginx

deploy-frontend:update build-frontend restart-nginx
	@echo "Frontend deployment completed."

deploy-backend:update build-backend stop-pm2 start-pm2 save-pm2 restart-nginx
	@echo "Backend deployment completed."

# 6. Full deployment: Update, build, and restart services
deploy: update build-frontend build-backend stop-pm2 start-pm2 save-pm2 restart-nginx
	@echo "Deployment completed."