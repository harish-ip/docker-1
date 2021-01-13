FROM centos:centos6

MAINTAINER Harish

RUN yum clean all

RUN yum update

RUN yum -y install httpd

COPY index.html /var/www/html/

CMD ["/usr/sbin/httpd", "-D", "FOREGROUND"]

EXPOSE 80
