# Makefile for automating deployment of frontend and backend services

# Variables
REPO_URL=https://github.com/j93es/j93es-blog.git
PROJECT_DIR=/srv/j93es-blog
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
	sudo rm -f $(FRONTEND_DIR)/.env
	sudo cp $(ENV_DIR)/frontend $(FRONTEND_DIR)/.env
	cd $(FRONTEND_DIR) && sudo npm install && sudo npm run build

build-backend:
	# env 가져오기
	sudo rm -f $(BACKEND_DIR)/.env
	sudo cp $(ENV_DIR)/backend $(BACKEND_DIR)/.env

	# src/public에 프론트 빌드파일 가져오기
	sudo mkdir -p $(BACKEND_DIR)/src/public/root/
	sudo rm -rf $(BACKEND_DIR)/src/public/root/*
	sudo cp -r $(FRONTEND_DIR)/build/* $(BACKEND_DIR)/src/public/root/

	# build
	cd $(BACKEND_DIR) && sudo npm install && sudo npm run build

	# dist에 public 복사
	sudo mkdir -p $(BACKEND_DIR)/dist/src/public
	sudo rm -rf $(BACKEND_DIR)/dist/src/public/*
	sudo cp -r $(BACKEND_DIR)/src/public/* $(BACKEND_DIR)/dist/src/public/

stop-pm2:
	sudo pm2 stop j93es-blog-backend || true && sudo pm2 delete j93es-blog-backend || true

start-pm2:
	cd $(BACKEND_DIR) && sudo pm2 start npm --name j93es-blog-backend -- run start

save-pm2:
	sudo pm2 save

restart-nginx:
	sudo systemctl reload nginx

deploy-frontend: update-force build-frontend restart-nginx
	@echo "Frontend deployment completed."

deploy-backend: update-force build-backend stop-pm2 start-pm2 save-pm2 restart-nginx
	@echo "Backend deployment completed."

deploy: update build-frontend build-backend stop-pm2 start-pm2 save-pm2 restart-nginx
	@echo "Deployment completed."

deploy-force: update-force build-frontend build-backend stop-pm2 start-pm2 save-pm2 restart-nginx
	@echo "Force Deployment completed."
	