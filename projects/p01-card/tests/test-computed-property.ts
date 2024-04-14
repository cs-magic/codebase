class T {
  public first = "mark"
  public second = "shawn"
  public get name() {
    return [this.first, this.second].join(" ")
  }

  public printName() {
    console.log({ name: this.name })
  }
}

const t = new T()
t.printName()

const t2 = {
  first: "mark",
  second: "shawn",
  get name() {
    return [this.first, this.second].join(" ")
  },
  printName() {
    console.log({ name: this.name })
  },
}

t2.printName()
