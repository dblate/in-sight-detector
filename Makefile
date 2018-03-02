# @author yuhui06
# @date 2018/3/2

# 避免跟本地的命令重复
.PHONY doc

doc:
    rm -rf ./docs
    mkdir ./docs
    ./node_modules/.bin/jsdoc2md -f ./in-sight-detector.js > ./docs/in-sight-detector.md

clean:
    rm -rf ./docs
