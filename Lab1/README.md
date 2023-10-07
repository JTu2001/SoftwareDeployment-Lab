# Inhaltsverzeichnis
- [Inhaltsverzeichnis](#inhaltsverzeichnis)
- [Aufgabenstellung](#aufgabenstellung)
  - [Vorbereitung](#vorbereitung)
  - [Durchführung](#durchführung)
    - [Anlegen eines Azure Storage Account](#anlegen-eines-azure-storage-account)
    - [Anlegen einer Azure Web-App für node.js](#anlegen-einer-azure-web-app-für-nodejs)
    - [Verwendung von Parametern](#verwendung-von-parametern)

# Aufgabenstellung
Erstellung eines ARM Templates welches:
- Einen Azure Storage Account (Free Tier) anlegt
- Eine Azure Web-App für node.js (Free Tier) anlegt
- Parameters verwendet

## Vorbereitung
Dieses Kapitel beschäftigt sich mit der Vorbereitung der Übung. Für die Vorbereitung der Übung sind folgende Schritte zu tätigen:
1. Visual Studio Code installieren 
2. Extension [Azure Resource Manager (ARM) Tools](https://marketplace.visualstudio.com/items?itemName=msazurermtools.azurerm-vscode-tools) für Visual Studio Code installieren
3. Anmelden mittels: `az login` 
4. Erstellen Sie eine Datei unter dem Namen `azuredeploy.json`.
5. Kopieren sie die Grundstruktur des Templates (Hinweis: Als alternative kann auch `arm` geschrieben werden und dadurch wird das Template vorgeschlagen):
```
{
    "$schema": "https://schema.management.azure.com/schemas/2019-04-01/deploymentTemplate.json#",
    "contentVersion": "1.0.0.0",
    "parameters": {},
    "functions": [],
    "variables": {},
    "resources": [],
    "outputs": {}
}
```


## Durchführung
Dieses Kapitel beschäftigt sich mit der Durchführung der Übung. Hier werden die einzelnen Schritte beschrieben. 

### Anlegen eines Azure Storage Account 
1. Unter `"resources": []` folgendes eintagen (Hinweis: Als alternative kann auch `arm-storage` geschrieben werden und dadurch wird das entsprechende Template vorgeschlagen):
```
{
    "name": "[YOUR STORAGE ACCOUNT NAME]",
    "type": "Microsoft.Storage/storageAccounts",
    "apiVersion": "2023-01-01",
    "tags": {
        "displayName": "[YOUR STORAGE ACCOUNT DISPLAY NAME]"
    },
    "location": "[resourceGroup().location]",
    "kind": "StorageV2",
    "sku": {
        "name": "Standard_LRS",
        "tier": "Standard"
    }
}
```
Hier wurde die Standard-Subscription gewählt. Als alternative kann auch die Premium version verwendet werden. [YOUR STORAGE ACCOUNT NAME] sollte durch einen gewünschten namen ersetzt werden. 

Die Gesammtstruktur von `azuredeploy.json` sollte wie folgt aussehen:
```
{
    "$schema": "https://schema.management.azure.com/schemas/2019-04-01/deploymentTemplate.json#",
    "contentVersion": "1.0.0.0",
    "parameters": {},
    "functions": [],
    "variables": {},
    "resources": [
        {
            "name": "[YOUR STORAGE ACCOUNT NAME]",
            "type": "Microsoft.Storage/storageAccounts",
            "apiVersion": "2023-01-01",
            "tags": {
                "displayName": "[YOUR STORAGE ACCOUNT NAME]"
            },
            "location": "[resourceGroup().location]",
            "kind": "StorageV2",
            "sku": {
                "name": "Standard_LRS",
                "tier": "Standard"
            }
        }
    ],
    "outputs": {}
}
```

Um das Deployment durchzuführen muss folgender Befehl in der PowerShell ausgeführt werden:
```
az deployment group create --resource-group [YOUR RESOURCE GROUP HERE] --template-file [PATH TO YOUR TEMPLATE]
```
Hinweis: Hierzu muss in erster Linie eine _Resource Group_ im Azure Portal erstellt werden. Hier einige Hinweise zum Befehl:
- `az group deployment create` -> Startet ein Deployment
- `--resource-group [YOUR RESOURCE GROUP HERE]` -> Definiert die _Resource Group_
- `--template-file [PATH TO YOUR TEMPLATE]` -> Definiert den Pfad zum Template-File (`../azuredeploy.json`)

### Anlegen einer Azure Web-App für node.js
1. Unter `"resources": []` die Microsoft-Serverfarms eintragen:
```
{
    "type": "Microsoft.Web/serverfarms",
    "apiVersion": "2021-02-01",
    "name": "[YOUR NAME]",
    "location": "[resourceGroup().location]",
    "sku": {
        "name": "F1"
    },
    "kind": "windows",
    "properties": {
        "reserved": true
    }
}
```
Hierbei soll [YOUR NAME] durch den gewünschten Namen ersetzt werden. `F1` kennzeichnet die Kosten (hier: kostenlos).
2. Unter `"resources": []` die Web-App eintragen:
```
{
    "name": "webapptunjic",
    "type": "Microsoft.Web/sites",
    "apiVersion": "2022-09-01",
    "location": "[resourceGroup().location]",
    "tags": {
        "[concat('hidden-related:', resourceGroup().id, '/providers/Microsoft.Web/serverfarms/appServicePlan1')]": "Resource",
        "displayName": "webapptunjic"
    },
    "dependsOn": [
        "[resourceId('Microsoft.Web/serverfarms', 'serverfarmstunjic')]"
    ],
    "properties": {
        "name": "webapptunjic",
        "serverFarmId": "[resourceId('Microsoft.Web/serverfarms', 'serverfarmstunjic')]"
    }
}
```
Um die Web-App zu bereitstellen muss folgender Befehl eingegeben werden:
```
az deployment group create --resource-group [YOUR RESOURCE GROUP HERE] --template-file [PATH TO YOUR TEMPLATE]
```
Hinweis: Hierzu muss in erster Linie eine _Resource Group_ im Azure Portal erstellt werden. Hier einige Hinweise zum Befehl:
- `az group deployment create` -> Startet ein Deployment
- `--resource-group [YOUR RESOURCE GROUP HERE]` -> Definiert die _Resource Group_
- `--template-file [PATH TO YOUR TEMPLATE]` -> Definiert den Pfad zum Template-File (`../azuredeploy.json`)

### Verwendung von Parametern
1. Erstellen sie ein File mit dem Namen `azuredeploy.parameters.json` und erstelle folgenden eintrag:
```
{
    "$schema": "https://schema.management.azure.com/schemas/2019-04-01/deploymentParameters.json#",
    "contentVersion": "1.0.0.0",
    "parameters": { }
}
```
2. Erstelle ein Parameter in `azuredeploy.parameters.json`:
```
{
    "$schema": "https://schema.management.azure.com/schemas/2019-04-01/deploymentParameters.json#",
    "contentVersion": "1.0.0.0",
    "parameters": {
        "[YOUR PARAMETER NAME]": {
            "value": "[YOUR VALUE HERE]"
        }   
    }
}
```
Wobei [YOUR PARAMETER NAME] und [YOUR VALUE HERE] durch den gewünschten Parameter und Wert ersetzt werden soll. 
3. Im `azuredeploy.json` mussen die Parameter definiert werden:
```
{
    "$schema": "https://schema.management.azure.com/schemas/2019-04-01/deploymentTemplate.json#",
    "contentVersion": "1.0.0.0",
    "parameters": {
        "[YOUR PARAMETER NAME]": {
            "type": "string",
            "metadata": {
                "description": "[YOUR DESCRIPTION HERE]"
            }
        }
    },
    "functions": [],
    "variables": {},
    "resources": [],
    "outputs": {}
}
```
Wobei [YOUR PARAMETER NAME] mit dem Parametername vom `azuredeploy.parameters.json` übereinstimmen muss.  
4. Hierbei muss beim deployment folgender Befehl ausgeführt werden:
```
az deployment group create --resource-group [YOUR RESOURCE GROUP HERE] --template-file [PATH TO YOUR TEMPLATE] --parameters [PATH TO YOUR PARAMETER FILE]
```
Hier einige Hinweise zum Befehl:
- `az group deployment create` -> Startet ein Deployment
- `--resource-group [YOUR RESOURCE GROUP HERE]` -> Definiert die _Resource Group_
- `--template-file [PATH TO YOUR TEMPLATE]` -> Definiert den Pfad zum Template-File (`../azuredeploy.json`)
- `--parameters [PATH TO YOUR PARAMETER FILE]` -> Definiert den Pfad zum Parameter-File (`../azuredeploy.parameters.json`)