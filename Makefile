# Makefile for automating deployment of frontend and backend services

# Variables
REPO_URL=https://github.com/j93es/j93es-blog.git
PROJECT_DIR=/srv/j93es-blog/j93es-blog
FRONTEND_DIR=$(PROJECT_DIR)/frontend
BACKEND_DIR=$(PROJECT_DIR)/backend
ENV_DIR=/srv/j93es-blog/env

# Targets
.PHONY: all update update-force build-frontend build-backend deploy deploy-frontend deploy-backend restart-nginx start-pm2 stop-pm2

update:
	if [ ! -d "$(PROJECT_DIR)" ]; then \
		sudo git clone $(REPO_URL) $(PROJECT_DIR); \
	else \
		cd $(PROJECT_DIR) && if sudo git pull | grep -q "Already up to date."; then \
			echo "No changes to update. Exiting..."; \
			exit 1; \
		fi; \
	fi

update-force:
	if [ ! -d "$(PROJECT_DIR)" ]; then \
		sudo git clone $(REPO_URL) $(PROJECT_DIR); \
	else \
		cd $(PROJECT_DIR) && sudo git pull; \
	fi

build-frontend:
	sudo cp $(ENV_DIR)/frontend $(FRONTEND_DIR)/.env && cd $(FRONTEND_DIR) && sudo npm install && sudo npm run build && sudo cp -r $(FRONTEND_DIR)/build/* $(BACKEND_DIR)/src/public/ && sudo mkdir -p $(BACKEND_DIR)/src/public/root/ && sudo cp -r $(FRONTEND_DIR)/build/* $(BACKEND_DIR)/src/public/root/

build-backend:
	sudo cp $(ENV_DIR)/backend $(BACKEND_DIR)/.env && cd $(BACKEND_DIR) && sudo npm install && sudo npm run build

stop-pm2:
	pm2 stop j93es-blog-backend || true && pm2 delete j93es-blog-backend || true

start-pm2:
	cd $(BACKEND_DIR) && pm2 start npm --name j93es-blog-backend -- run start

save-pm2:
	pm2 save

restart-nginx:
	sudo systemctl reload nginx

deploy-frontend: update-force build-frontend restart-nginx
	@echo "Frontend deployment completed."

deploy-backend: update-force build-backend stop-pm2 start-pm2 save-pm2 restart-nginx
	@echo "Backend deployment completed."

deploy-force: update-force build-frontend build-backend stop-pm2 start-pm2 save-pm2 restart-nginx
	@echo "Force deployment completed."

deploy: update build-frontend build-backend stop-pm2 start-pm2 save-pm2 restart-nginx
	@echo "Deployment completed."