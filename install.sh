#!/bin/bash
# Installer
#   Deployed to https://gitlab.com/-/snippets/3611198/raw for shorter URL
#   To be called `sh -c "$(curl -sSL https://gitlab.com/-/snippets/3611198/raw)"`
# TODO - Add check for system compatibility or ignore?
{
set -x # enable display output of commands; shortcut to adding descriptive echo

cd ~ || exit
echo "$TERMUX_VERSION"

# prerequisites
apt update && apt upgrade -y
pkg install nodejs-lts -y

if [ -d "$HOME/JTVServer" ]; then # if already installed
   kill -9 "$(lsof -t -i:3500 -sTCP:LISTEN)"
   mkdir -p "$HOME/JTVServerTmpBak"
   for f in "$HOME/JTVServer"/*.jiotv; do
    if [ -f "$f" ]; then
        mv "$f" "$HOME/JTVServerTmpBak"  # take a backup in JTVServerTmpBak
	fi
   done
   rm -rf "$HOME/JTVServer" # remove existing
fi

# download
# TODO fix the path
curl -o JTVServer.tar.gz -sSL https://github.com/rrjanbiah/JTVFire/releases/latest/download/JTVServer.tar.gz
tar -xvf JTVServer.tar.gz
for f in "$HOME/JTVServerTmpBak"/*.jiotv; do # restore
    if [ -f "$f" ]; then
        mv "$f" "$HOME/JTVServer/"
	fi
    rm -rf "$HOME/JTVServerTmpBak"
done
rm JTVServer.tar.gz

# setup boot...
mkdir -p ~/.termux/boot
touch ~/.termux/boot/JTVServer.rc
chmod +x ~/.termux/boot/JTVServer.rc
cat <<EOF > ~/.termux/boot/JTVServer.rc && echo "Written ~/.termux/boot/JTVServer.rc"
#!/bin/sh
termux-wake-lock
cd $HOME/JTVServer/
# TODO test log trimmer
head -c 50M JTVServer.log > JTVServer.log.tmp && mv JTVServer.log.tmp JTVServer.log
# TODO cleanup *.db once in a while
# rm *.db
# TODO add nohup or leave it for debugging?
node index.js >> JTVServer.log 2>&1 &
EOF


set +x
} 2>&1 | tee -a "$HOME/JTVServer/JTVServer.log"