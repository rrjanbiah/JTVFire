#!/bin/bash
# Installer - TODO move it to server & refactor
# TODO - Add check for system compatibility or ignore?
# TODO `sh -c "$(curl -sSL https://remote.com/install.sh)"`
{
set -x # enable display output of commands; shortcut to adding descriptive echo

echo "$TERMUX_VERSION"

# prerequisites
apt update && apt upgrade -y
pkg install nodejs-lts -y

if [ -d "$HOME/JTVServer" ]; then # if already installed
   kill -9 "$(lsof -t -i:3500 -sTCP:LISTEN)"
   for f in $("$HOME/JTVServer/*.jiotv"); do
    if [ -f "$f" ]; then
        mv "$f" .  # take a backup in home
	fi
   done
   rm -rf "$HOME/JTVServer" # remove existing
fi

# download
# TODO fix the path
curl -o JTVServer.tar.gz https://github.com/dhruv-2015/JIOTVServer/releases/download/V2.9.3/JTVServer.tar.gz
tar -xvf JTVServer.tar.gz
for f in $("$HOME/*.jiotv"); do # restore
    if [ -f "$f" ]; then
        mv "$f" "$HOME/JTVServer/"  # take a backup in home
	fi
done

# setup boot...
mkdir -p ~/.termux/boot
touch ~/.termux/boot/JTVServer.rc
chmod +x ~/.termux/boot/JTVServer.rc
cat <<EOF > ~/.termux/boot/JTVServer.rc && echo "Written ~/.termux/boot/JTVServer.rc"
#!/bin/sh
termux-wake-lock
cd $HOME/JTVServer/
# TODO add nohup, trim log
node index.js > JTVServer.log 2>&1 &
EOF

lsof -t -i:3500 -sTCP:LISTEN  # TODO no use

set +x
} 2>&1 | tee -a JTVServer.log