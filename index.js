
let target = null

function watcher(activeEffect) {
    target = activeEffect
    activeEffect()
    target = null
}

class Dep {
    constructor() {
        this.subs = new Set()
    }

    notify() {
        console.log(this.subs)
        this.subs.forEach((sub) => sub())
    }

    depend() {
        if(target) {
            this.subs.add(target)
        }
    }
}


function reactive(state) {

    Object.keys(state).forEach(key => {
        let value = state[key]
        const dep = new Dep()

        Object.defineProperty(state, key, {
            get() {
                dep.depend()
                return value
            },
            set(newValue) {
                if(newValue !== value) {
                    value = newValue
                    dep.notify()
                }
            }
        })
    })

    return state
}

const state = {
    count: 0
}

reactive(state)


watcher(() => {
    console.log('Reactivity::: ', state.count)
})

state.count = 10
state.count += 20




