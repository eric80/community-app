# Builds production version of Community App inside Docker container,
# and runs it against the specified Topcoder backend (development or
# production) when container is executed.

FROM node:8.11.1
LABEL app="Community App" version="1.0"

WORKDIR /opt/app
COPY . .

RUN npm install
RUN npm test
RUN npm run build

ARG COGNITIVE_NEWSLETTER_SIGNUP_APIKEY
ARG COGNITIVE_NEWSLETTER_SIGNUP_URL
ARG CONTENTFUL_CDN_API_KEY
ARG CONTENTFUL_PREVIEW_API_KEY
ARG CONTENTFUL_SPACE_ID
ARG FILESTACK_API_KEY
ARG FILESTACK_SUBMISSION_CONTAINER
ARG NODE_CONFIG_ENV
ARG SERVER_API_KEY
ARG SEGMENT_IO_API_KEY

ENV COGNITIVE_NEWSLETTER_SIGNUP_APIKEY=$COGNITIVE_NEWSLETTER_SIGNUP_APIKEY
ENV COGNITIVE_NEWSLETTER_SIGNUP_URL=$COGNITIVE_NEWSLETTER_SIGNUP_URL
ENV CONTENTFUL_CDN_API_KEY=$CONTENTFUL_CDN_API_KEY
ENV CONTENTFUL_PREVIEW_API_KEY=$CONTENTFUL_PREVIEW_API_KEY
ENV CONTENTFUL_SPACE_ID=$CONTENTFUL_SPACE_ID
ENV FILESTACK_API_KEY=$FILESTACK_API_KEY
ENV FILESTACK_SUBMISSION_CONTAINER=$FILESTACK_SUBMISSION_CONTAINER
ENV NODE_CONFIG_ENV=$NODE_CONFIG_ENV
ENV SERVER_API_KEY=$SERVER_API_KEY
ENV SEGMENT_IO_API_KEY=$SEGMENT_IO_API_KEY

EXPOSE 3000
CMD ["npm", "start"]
