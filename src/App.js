import { Console } from "@woowacourse/mission-utils";

class App {

  constructor() {
    this.car = [];
  }

  async play() {
    const carName = await this.getCarName();
    this.MakeCar(carName);
  }

  async getCarName() {
    const inputCar = await Console.readLineAsync("경주할 자동차 이름을 입력하세요.(이름은 쉼표(,) 기준으로 구분)\n");
    return this.sanitizeCarName(inputCar);
  }

  sanitizeCarName(inputCar) {
    const sanitizedCar = inputCar.split(',').map(name => name.trim()).filter(name => name);
    return this.#validateCarName(sanitizedCar);
  }
  
  #validateCarName(sanitizedCar) {
    this.#checkMinimumCar(sanitizedCar);
    this.#checkCarLength(sanitizedCar);
    this.#checkCarDuplicate(sanitizedCar);
    return sanitizedCar;
  }

  #checkMinimumCar(sanitizedCar) {
    if (sanitizedCar.length < 2) {
      throw new Error("[ERROR] 최소 두 대 이상의 자동차 이름을 입력해주세요.");
    }
  }

  #checkCarLength(sanitizedCar) {
    if (sanitizedCar.some(name => name.length > 5)) {
      throw new Error("[ERROR] 자동차 이름은 5자를 초과할 수 없습니다.");
    }
  }

  #checkCarDuplicate(sanitizedCar) {
    if (new Set(sanitizedCar).size !== sanitizedCar.length) {
      throw new Error("[ERROR] 중복되는 자동차 이름이 있습니다.");
    }
  }

  MakeCar(carName) {
    this.car = carName.map(name => ({ name }));
  }

  async getRoundNumber() {
    const inputRound = await Console.readLineAsync("시도할 횟수는 몇 회인가요?\n");
    return this.sanitizeRoundNumber(inputRound);
  }

  sanitizeRoundNumber(inputRound) {
    const sanitizedRound = parseInt(inputRound.trim().replace(/\s+/g, ''), 10);
    if (inputRound.includes('.') || !Number.isInteger(sanitizedRound)) {
      throw new Error("[ERROR] 횟수는 자연수 형식이어야 합니다");
    }  
    return this.#validateRound(sanitizedRound);
  }

  #validateRound(sanitizedRound) {
    this.#checkMinimumRound(sanitizedRound);
    this.#checkMaximumRound(sanitizedRound);
    return sanitizedRound;
  }

  #checkMinimumRound(sanitizedRound) {
    if (sanitizedRound < 1) {
      throw new Error("[ERROR] 최소 1 이상의 횟수를 입력해주세요.");
    }
  }

  #checkMaximumRound(sanitizedRound) {
    if (sanitizedRound > 10) {
      throw new Error("[ERROR] 최대 10 이하의 횟수를 입력해주세요.");
    }
  }


}

const app = new App();
app.play();

export default App;
