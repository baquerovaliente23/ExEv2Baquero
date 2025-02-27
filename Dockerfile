FROM httpd:2.4
# Copia los archivos de la aplicación al contenedor
COPY ./ /usr/local/apache2/htdocs/
COPY ./httpd.conf /usr/local/apache2/conf/httpd.conf
COPY ./server.crt/ /usr/local/apache2/conf/
COPY ./server.key/ /usr/local/apache2/conf/
# Expone el puerto 443 para HTTPS
EXPOSE 443
