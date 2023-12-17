# Software Deployment
Dies ist ein Repository für Übungsaufgaben im Fach "Software Deployment". Hier befindet sich eine Sammlung von Aufgaben, die im Rahmen der LV "Software Deployment" durchgeführt werden. Die Übungen sind in den entsprechenden Unterordnern organisiert.

## Übung 1 - ARM Template
Erstellung eines ARM Templates welches:
- Einen Azure Storage Account (Free Tier) anlegt
- Eine Azure Web-App für node.js (Free Tier) anlegt
- Parameters verwendet

Abgabefrist: `13.10.2023`

## Übung 2 - Pipelines
Links zu einem Git Repo mit folgendem Inhalt im Ordner Lab2:
- Die NodeJS applikation
- eine README.md mit folgenden Informationen:
- Links zu den Azure Web Apps (dev & production)
- Screenshot der Azure DevOps build/Test/Deploy Pipeline incl.  erfolgreicher und nicht erfolgreicher Deployments
- Screenshot der Azure DevOps Release Pipeline
- Dokumentation wie die Releases freigegeben werden

Abgabefrist: `17.11.2023`

## Übung 3 - Docker
Setzen Sie die Software „Wordpress“ mit externer MySQL DB in 2 Containern auf. Diese Aufgabe besteht aus 2 Teilen. In den Teilen wird jeweils die gleiche Software mittels container zu Verfügung gestellt, wobei die container in Teil 2 selbst zu erstellen sind.

### Teil 1
Erstellung eines Docker-Compose files welche Wordpress und MySQL images verwendet um eine Wordpress Container infrastruktur aufzusetzen.

### Teil 2 
Erstellung eigener Images auf basis von debian für eine Wordpress container installation. 
- Apache + PHP + Wordpress
- MySQL

Beide Images benötigen persistente Volumes. Wordpress um die hochgeladene dateien und die config zu verwalten, MySQL um die datenbank persistent zu halten.  Di beiden Container sollen mittels TCP/IP kommunizieren können. Beachten sie dafür die entsprechenden Ports.

Abgabefrist: `01.12.2023`

## Übung 4 -  Azure Kubernetes Service (AKS) 
Aufestezen und Konfiguration eines AKS in Azure. Konfiguration und deplyoment von Wordpress incl. MySQL in dem AKS cluster. 


Abgabefrist: `21.12.2023`