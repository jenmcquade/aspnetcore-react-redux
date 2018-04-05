FROM jonmcquade/dotnetcore-runtime-sdk-node-python:dotnetcore-asp
WORKDIR /dotnetcorespa
ARG aspenv="Development"
ENV ASPNETCORE_ENVIRONMENT $aspenv\
ARG port="5000"
ENV PORT $port
ARG sslPort="5001"
ENV SSL_PORT $sslPort
ARG runtime="Release"
ENV RUNTIME $runtime
ENV DOTNET_SKIP_FIRST_TIME_EXPERIENCE true
COPY ./entrypoint /
COPY ./tpl /tpl
COPY . .
RUN npm install \
  && dotnet restore 
ARG serverUrls="http://*:$PORT;https://*:$SSL_PORT"
ENV ASPNETCORE_URLS $serverUrls
EXPOSE 9229 $port $ssl_port
CMD sh /entrypoint

