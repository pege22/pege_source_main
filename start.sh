echo Iniciando..
sleep 1.5
cd Site
sleep 1
RED="\e[31m"
GREEN="\e[32m"
ENDCOLOR="\e[0m"


echo -e "${RED} ██▓     █    ██  ██▓  ██████  ███▄    █ ▓█████▄▄▄█████▓";
echo -e "${RED}▓██▒     ██  ▓██▒▓██▒▒██    ▒  ██ ▀█   █ ▓█   ▀▓  ██▒ ▓▒";
echo -e "${RED}▒██░    ▓██  ▒██░▒██▒░ ▓██▄   ▓██  ▀█ ██▒▒███  ▒ ▓██░ ▒░";
echo -e "${RED}▒██░    ▓▓█  ░██░░██░  ▒   ██▒▓██▒  ▐▌██▒▒▓█  ▄░ ▓██▓ ░ ";
echo -e "${RED}░██████▒▒▒█████▓ ░██░▒██████▒▒▒██░   ▓██░░▒████▒ ▒██▒ ░ ";
echo -e "${RED}░ ▒░▓  ░░▒▓▒ ▒ ▒ ░▓  ▒ ▒▓▒ ▒ ░░ ▒░   ▒ ▒ ░░ ▒░ ░ ▒ ░░   ";
echo -e "${RED}░ ░ ▒  ░░░▒░ ░ ░  ▒ ░░ ░▒  ░ ░░ ░░   ░ ▒░ ░ ░  ░   ░    ";
echo -e "${RED}  ░ ░    ░░░ ░ ░  ▒ ░░  ░  ░     ░   ░ ░    ░    ░      ";
echo -e "${RED}    ░  ░   ░      ░        ░           ░    ░  ░        ";
echo -e "${RED}                                                        ";
sleep 5
clear
echo Backend Creado por Luis9799 
echo Twitter: yt1luiscraft
echo Discord: Luis!#5902
echo Github: LUIS9799
echo Telegram: L9799
echo Correo: soporte@luisweb.cf
sleep 1
echo Iniciando webserver..
sleep 1
echo WebServer iniciado en el puerto 8080 y websocket en el puerto 3000 | 
Heroku env #FixByLuis
sleep 2
npm install
clear
sleep 1
node run.js
