# Congo Unity Platform

A full-stack MERN web app connecting the Congolese diaspora to housing, healthcare, food assistance, and immigration resources — in one place, in one community.

**Live app:** https://congolese-community-platform.vercel.app

## What it does

- **Housing** — listings and requests for the diaspora community
- - **Healthcare** — connecting members with care resources
  - - **Food assistance** — requests and coordination
    - - **Immigration** — resources and document support
      - - **Stories/comments** — so the community can talk to each other, not just browse a directory
       
        - ## Tech stack
       
        - - **Frontend:** React
          - - **Backend:** Node.js, Express
            - - **Database:** MongoDB
              - - **Auth:** JWT authentication with role-based access control
                - - **File uploads:** Cloudinary (immigration paperwork, housing listings)
                  - - **Deployment:** Vercel (140+ deployments)
                   
                    - ## Why I built this
                   
                    - I wanted to build something for a community I'm actually part of. Every feature here has a real person attached to it, which raised the bar for what "done" means compared to a typical class project.
                   
                    - ## Getting started
                   
                    - ```bash
                      # backend
                      cd backend
                      npm install
                      npm start

                      # frontend
                      cd frontend
                      npm install
                      npm start
                      ```

                      You'll need your own MongoDB connection string and Cloudinary credentials in a `.env` file (see the `backend` folder).

                      ## Author

                      Joel Kalala — [LinkedIn](https://www.linkedin.com/in/joel-kalala1-079492293/) · kalalajoel27@gmail.com
                      
