
![PCB Design](https://i.imgur.com/J7RirB9.png)
	**VEXBridge** is a custom PCB designed by VEX-U team [DevilBots](https://devilbots.org) to easily interface 3rd party components such as a Raspberry Pi, Arduino, or ESP32 w/ a VEX V5 brain. Its made and designed in [KiCAD](https://www.kicad.org/) which is a free and open source design software for electronics.

## Features

- Integrated 5V Regulator for powering components (3A max)
- Communicate w/ RS-232 w/ half-duplex
- Status LEDs for power, transmit, and receive
- ESD Protection w/ TVS diodes

## How to Use

### Power

For voltage regulation, the bridge integrates a [LM2596S](https://www.ti.com/lit/ds/symlink/lm2596.pdf). This steps the fluctuating 12V rail from the VEX battery down to a stable 5V 3A max. While this isn't designed to drive DC motors, it should be enough to supply high powered SBCs such as the Jetson Nano.

### Comms

For communication, the bridge uses a [MAX485](https://www.analog.com/media/en/technical-documentation/data-sheets/MAX1487-MAX491.pdf) to convert the RS-485 signal to UART that can be used by common SBCs. Unfortunately, this connection is only half-duplex. By default, the RTS pin is pulled low which disabled transmitting and enables receiving. In order to start transmitting data to the VEX brain, the RTS pin must be pulled high. This can be done directly within the SBC or using the ADI pins on the VEX brain.

#### PROS

PROS provides an conveniently built-in `Serial` object to communicate directly w/ the V5 port.
```cpp
uint8_t PORT = 1;
uint32_t BAUDRATE = 115200;
pros::Serial m_bridge = pros::Serial(PORT, BAUDRATE);

// Transmit
uint8_t buffer[] = {0x01, 0x02, 0x03};
m_bridge.write(buffer, sizeof(buffer));

// Receive
while (m_bridge.get_read_avail())
	printf("Read: %d\n", serial.read_byte());

// See PROS documentation/implementation for more details
// https://github.com/purduesigbots/pros/blob/develop-pros-4/include/pros/serial.hpp
```
When writing data, it should be encoded w/ [COBS](https://en.wikipedia.org/wiki/Consistent_Overhead_Byte_Stuffing) to provide checksum and mark packet beginning/end. 
