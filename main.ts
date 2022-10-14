radio.onReceivedNumber(function (receivedNumber) {
    primljeno.push(receivedNumber)
})
function pratiCrtu () {
    music.playTone(262, music.beat(BeatFraction.Whole))
    while (DFRobotMaqueenPlus.readPatrol(Patrol.L1) == 1 || DFRobotMaqueenPlus.readPatrol(Patrol.L2) == 1 || (DFRobotMaqueenPlus.readPatrol(Patrol.R1) == 1 || DFRobotMaqueenPlus.readPatrol(Patrol.R2) == 1)) {
        if ((DFRobotMaqueenPlus.readPatrol(Patrol.L2) == 0 || DFRobotMaqueenPlus.readPatrol(Patrol.L1) == 0) && (DFRobotMaqueenPlus.readPatrol(Patrol.R1) == 1 || DFRobotMaqueenPlus.readPatrol(Patrol.R2) == 1)) {
            DFRobotMaqueenPlus.mototRun(Motors.M1, Dir.CW, 50)
            DFRobotMaqueenPlus.mototRun(Motors.M2, Dir.CW, 0)
        } else {
            if ((DFRobotMaqueenPlus.readPatrol(Patrol.L1) == 1 || DFRobotMaqueenPlus.readPatrol(Patrol.L2) == 1) && (DFRobotMaqueenPlus.readPatrol(Patrol.R1) == 0 || DFRobotMaqueenPlus.readPatrol(Patrol.R2) == 0)) {
                DFRobotMaqueenPlus.mototRun(Motors.M2, Dir.CW, 50)
                DFRobotMaqueenPlus.mototRun(Motors.M1, Dir.CW, 0)
            } else {
                DFRobotMaqueenPlus.mototRun(Motors.ALL, Dir.CW, 60)
            }
        }
    }
}
function vozi (direction: number) {
    if (direction == 3) {
        while (DFRobotMaqueenPlus.readPatrol(Patrol.L1) == 0 && DFRobotMaqueenPlus.readPatrol(Patrol.L2) == 0 && (DFRobotMaqueenPlus.readPatrol(Patrol.R1) == 0 && DFRobotMaqueenPlus.readPatrol(Patrol.R2) == 0)) {
            DFRobotMaqueenPlus.mototRun(Motors.ALL, Dir.CW, 50)
        }
        DFRobotMaqueenPlus.mototStop(Motors.M1)
        DFRobotMaqueenPlus.mototStop(Motors.M2)
        pratiCrtu()
        DFRobotMaqueenPlus.mototStop(Motors.M1)
        DFRobotMaqueenPlus.mototStop(Motors.M2)
    } else {
        if (direction == 1) {
            while (DFRobotMaqueenPlus.readPatrol(Patrol.L1) == 0 && DFRobotMaqueenPlus.readPatrol(Patrol.R1) == 0) {
                DFRobotMaqueenPlus.mototRun(Motors.M2, Dir.CW, 50)
                DFRobotMaqueenPlus.mototStop(Motors.M1)
            }
            DFRobotMaqueenPlus.mototStop(Motors.M1)
            DFRobotMaqueenPlus.mototStop(Motors.M2)
            pratiCrtu()
            DFRobotMaqueenPlus.mototStop(Motors.M1)
            DFRobotMaqueenPlus.mototStop(Motors.M2)
        } else {
            while (DFRobotMaqueenPlus.readPatrol(Patrol.L1) == 0 && DFRobotMaqueenPlus.readPatrol(Patrol.R1) == 0) {
                DFRobotMaqueenPlus.mototRun(Motors.M1, Dir.CW, 50)
                DFRobotMaqueenPlus.mototStop(Motors.M2)
            }
            DFRobotMaqueenPlus.mototStop(Motors.M1)
            DFRobotMaqueenPlus.mototStop(Motors.M2)
            pratiCrtu()
            DFRobotMaqueenPlus.mototStop(Motors.M1)
            DFRobotMaqueenPlus.mototStop(Motors.M2)
        }
    }
}
let dir = 0
let check = false
let yplus = 0
let xplus = 0
let steps = 0
let ysteps = 0
let xsteps = 0
let xdir = false
let primljeno: number[] = []
radio.setGroup(50)
primljeno = []
let x: number[] = []
let y: number[] = []
let control2 = -1
basic.forever(function () {
    basic.showLeds(`
        . . . . .
        . . . . .
        . . . . .
        . . . . .
        . . . . .
        `)
    xdir = true
    if (primljeno[primljeno.length - 1] == control2) {
        for (let index = 0; index <= (primljeno.length - 1) / 2 - 1; index++) {
            x.push(primljeno[2 * index])
            y.push(primljeno[2 * index + 1])
        }
        for (let index = 0; index <= x.length - 1; index++) {
            led.plot(x[index], 4 - y[index])
        }
        basic.pause(2000)
        basic.showString("GO!")
        for (let index = 0; index <= x.length - 1; index++) {
            led.plot(x[index], 4 - y[index])
        }
        for (let index = 0; index <= x.length - 2; index++) {
            xsteps = x[index + 1] - x[index]
            ysteps = y[index + 1] - y[index]
            steps = xsteps + ysteps
            xplus = 0
            yplus = 0
            led.plot(x[index], 4 - y[index])
            basic.pause(2000)
            for (let path = 0; path <= steps - 1; path++) {
                if (xplus < xsteps && yplus < ysteps) {
                    check = Math.randomBoolean()
                    if (check == true) {
                        xplus += 1
                        if (xdir) {
                            dir = 3
                        } else {
                            dir = 2
                            xdir = true
                        }
                    } else {
                        yplus += 1
                        if (!(xdir)) {
                            dir = 3
                        } else {
                            dir = 1
                            xdir = false
                        }
                    }
                } else {
                    if (xplus < xsteps) {
                        xplus += 1
                        if (xdir) {
                            dir = 3
                        } else {
                            dir = 2
                            xdir = true
                        }
                    } else {
                        yplus += 1
                        if (!(xdir)) {
                            dir = 3
                        } else {
                            dir = 1
                            xdir = false
                        }
                    }
                }
                led.plot(x[index] + xplus, 4 - (y[index] + yplus))
                basic.pause(1000)
                vozi(dir)
            }
        }
        primljeno[primljeno.length - 1] = control2 - 1
    }
    primljeno = []
})
