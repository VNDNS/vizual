## Spacecraft Technology Tech Tree

### Roots (the trunk)
- **Basic rocketry**: chemical propellants, pressure-fed tanks, simple guidance.
- **Guidance and control**: gyroscopes, star trackers, reaction control thrusters.
- **Structures and materials**: aluminum frames, ablative heat shields, early composites.
- **Power**: primary batteries, then solar panels and fuel cells.
- **Communications**: simple radios, ground stations, line-of-sight antennas.

These basics support most missions. From this trunk, branches emerge and fork as needs change.

### Branch: Launch and Reentry
- **Expendable launchers → reusable boosters**: parachute splashdowns → propulsive landings.
- **Thermal protection**: ablative tiles → reusable tiles → metallic TPS.
- **Fairings**: single-use → recovery and reuse.

### Branch: Propulsion (in space)
- **Chemical**: monoprop → biprop → cryogenic methane/oxygen for higher performance and cleaner reuse.
- **Electric**: Hall and ion thrusters → higher-power systems for deep space and station-keeping.
- **Sail/tether concepts**: solar sails, electrodynamic tethers; niche but growing.
- **Nuclear (fork)**: thermal (high thrust) vs electric (high efficiency); promising for Mars and beyond.

### Branch: Power
- **Short missions**: batteries → more energy-dense chemistries.
- **Earth orbit**: rigid solar arrays → deployable/flexible arrays → solar tracking and MPPT.
- **Deep space**: RTGs → advanced radioisotope systems → potential fission reactors for high power.

### Branch: Guidance, Navigation, Control (GNC)
- **Sensors**: gyros → star trackers → lidar/radar for rendezvous and landing.
- **Actuators**: reaction wheels, control moment gyros, RCS thrusters.
- **Autonomy**: ground-in-the-loop → onboard fault detection → real-time hazard avoidance and docking.

### Branch: Structures and Manufacturing
- **Materials**: aluminum → carbon composites → metallic 3D prints → ceramic matrix composites for high heat.
- **Design**: monolithic buses → modular buses → plug-and-play payloads.
- **Manufacture**: subtractive → additive manufacturing → in-orbit assembly/repair (early stage).

### Branch: Thermal Control
- **Passive**: coatings, multi-layer insulation → variable emissivity surfaces.
- **Active**: pumped loops, phase-change systems → deployable radiators for high-power craft.

### Branch: Communications and Avionics
- **Radios**: S/X-band → Ka-band; better coding and modulation.
- **Antennas**: fixed → gimbaled high-gain → phased arrays.
- **Networking**: point-to-point → relay networks → optical laser links for high data rates.

### Branch: Human Spaceflight (when crew are aboard)
- **Life support**: open-loop (consumables) → closed-loop recycling of air/water → partial food production.
- **Habitats**: rigid modules → inflatable habitats → radiation-shielded, rotating concepts (future).
- **Safety**: launch escape systems → integrated abort → fault-tolerant, fail-operational designs.

### Cross-cutting: Software and Autonomy
- **From scripted ops → event-driven → model-based autonomy** with formal verification for safety.
- **Onboard AI**: vision-based navigation, health monitoring, planning under delay.

### Key forks and trade-offs
- **Reusability vs expendable**: lower cost per flight vs simplicity.
- **Chemical vs electric vs nuclear**: high thrust vs high efficiency vs high power/complexity.
- **Monolithic vs modular**: fewer interfaces vs easier upgrades and servicing.
- **Crewed vs robotic**: human flexibility vs mass, cost, and risk.

### Dominant patterns today
- Reusable first stages, methane engines, landing legs, grid fins.
- Solar-electric propulsion for station-keeping and deep-space probes.
- High-gain Ka-band and increasing use of optical links.
- Modular smallsats and rideshare launches; mega-constellations for comms and sensing.

### Emerging shoots (near-future growth)
- On-orbit refueling and propellant depots to enable larger missions with smaller launchers.
- Rapid reuse upper stages and heat-resistant structures for point-to-point and cislunar ops.
- Nuclear thermal/electric for fast transits to Mars and outer planets.
- In-space manufacturing and assembly to build large antennas, radiators, and habitats.
- Autonomous swarms and fractionated spacecraft that cooperate as one system.

### How this forms a tech tree
- New needs cause forks; successful branches harden into standards (e.g., reusable boosters).
- Some paths fade (purely expendable everything) while others dominate (solar-electric for efficiency).
- Cross-branch advances combine (materials + autonomy + power) to open new branches (reentry reuse, depots).

In simple terms: we started with basic rockets and radios. Over time, we added smarter guidance, better materials, and new ways to push and power spacecraft. Each improvement opened new paths. The tree keeps growing toward cheaper, faster, and farther missions.
