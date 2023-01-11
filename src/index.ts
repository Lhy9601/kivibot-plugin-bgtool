import { KiviPlugin } from "@kivibot/core";
import {
  trimStart,
  parseInt,
  random,
  split,
  startsWith,
  trim,
  has,
  keys
} from "lodash";
import type { AllMessageEvent, Client } from "@kivibot/core";

const { version } = require("../package.json");

const plugin = new KiviPlugin("bgtool", version);

const config: { customDices: { [key: string]: string[] } } = {
  customDices: {}
};

plugin.onMounted(() => {
  plugin.saveConfig(Object.assign(config, plugin.loadConfig()));
  plugin.onMessage(handleMessage);
});

plugin.onUnmounted(() => {
  plugin.saveConfig(config);
});

const handleMessage = (event: AllMessageEvent, bot: Client) => {
  const { raw_message } = event;
  if (raw_message == "showdice") {
    const result = ShowDice();
    event.reply(result, true);
  } else if (startsWith(trim(raw_message), "createdice ")) {
    const [, diceName, faces] = split(raw_message, " ");
    const result = CreateDice(diceName, faces);
    event.reply(result, true);
  } else if (startsWith(trim(raw_message), "rmdice ")) {
    const [, diceName] = split(raw_message, " ");
    const result = RemoveDice(diceName);
    event.reply(result, true);
  } else if (startsWith(trim(raw_message), "roll ")) {
    const [, ...dices] = split(raw_message, " ");
    const result = handleRolls(dices);
    event.reply(result, true);
  } else if (startsWith(trim(raw_message), "croll ")) {
    const [, diceName, times] = split(raw_message, " ");
    const result = handleCustomDiceRolls(diceName, times);
    event.reply(result, true);
  } else if (startsWith(trim(raw_message), "pickfirst ")) {
    const [, ...number] = split(raw_message, " ");
    const result = handlePickFirst(number);
    event.reply(result, true);
  }
};

//非主管理员
const handleCmd = (event: AllMessageEvent, params: any) => {
  const [cmd, arg] = params;
};

//主管理
const handleAdminCmd = (event: AllMessageEvent, params: any) => {
  const [cmd, arg] = params;
};

const handleRolls = (dices: string[]) => {
  let sum = 0;
  let result = "掷骰结果：\n";
  dices.forEach((dice) => {
    let _sum = 0;
    if (/(n*[0-9])d(n*[0-9])/.test(dice)) {
      const [num, side] = split(dice, "d");
      if (parseInt(num) > 0 && parseInt(side) > 0) {
        if (parseInt(num) >= 2) {
          result += `${num}d${side}：`;
          for (let i = 0; i < parseInt(num); i++) {
            const d = random(1, parseInt(side));
            if (i == 0) {
              result += `${d} `;
            } else {
              result += `+ ${d} `;
            }
            _sum += d;
          }
          result += `= ${_sum}\n`;
        } else {
          const d = random(1, parseInt(side));
          result += `1d${side}：${d}\n`;
          _sum += d;
        }
      }
    } else {
      if (/d(n*[0-9])/.test(dice)) {
        const side = trimStart(dice, "d");
        const d = random(1, parseInt(side));
        result += `1d${side}：${d}\n`;
        _sum += d;
      }
    }
    sum += _sum;
  });
  result += `合计点数：${sum}`;
  return result;
};

const ShowDice = () => {
  if (keys(config.customDices).length > 0) {
    let result = `自定义骰子列表：\n`;
    for (let i = 0; i < keys(config.customDices).length; i++) {
      result += `${i + 1}. ${keys(config.customDices)[i]}`;
    }
    return result;
  } else {
    return "不存在自定义骰子";
  }
};

const CreateDice = (diceName: string, faces: string) => {
  if (diceName && faces) {
    if (!has(config.customDices, diceName)) {
      const d = split(faces, ",，");
      config.customDices[diceName] = d;
      return `创建骰子${diceName}成功`;
    } else return `已存在同名骰子`;
  } else {
    return `骰子参数错误`;
  }
};

const RemoveDice = (diceName: string) => {
  if (diceName) {
    if (has(config.customDices, diceName)) {
      delete config.customDices[diceName];
      return `删除骰子“ ${diceName} ”成功`;
    } else return `不存在该骰子`;
  } else {
    return `骰子参数错误`;
  }
};

const handleCustomDiceRolls = (dice: string, times: string) => {
  let result = "掷骰结果：\n";
  const _dice = config.customDices[dice];
  if (_dice.length > 0) {
    if (parseInt(times) == 1 || times == undefined) {
      const d = random(_dice.length - 1);
      result += `${_dice[d]}`;
    } else if (parseInt(times) > 1) {
      for (let i = 0; i < parseInt(times); i++) {
        const d = random(_dice.length - 1);
        if (i == 0) result += `${_dice[d]}`;
        else result += `、 ${_dice[d]}`;
      }
    }
  }
  return result;
};

const handlePickFirst = (num: string[]) => {
  if (num.length == 1 && parseInt(num[0])) {
    const result = random(1, parseInt(num[0]));
    return `起始玩家为 ${result} 号`;
  } else {
    return "参数不正确";
  }
};

export { plugin };
