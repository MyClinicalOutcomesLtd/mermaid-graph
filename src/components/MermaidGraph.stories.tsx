import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import MermaidGraph from "./MermaidGraph";

export default {
  title: "MermaidGraph",
  component: MermaidGraph,
} as ComponentMeta<typeof MermaidGraph>;

const Template: ComponentStory<typeof MermaidGraph> = (args) => (
  <MermaidGraph {...args} />
);

export const Default = Template.bind({});
Default.args = {
  graphCode: `
  graph TD
  S0((S0)) -->|0a| D1((D1))
  D1((D1)) -->|1a| D3((D3))
  D1((D1)) -->|1b| D2((D2))
  D2((D2)) -->|2a| D5((D5))
  D2((D2)) -->|2b| D6((D6))
  D2((D2)) -->|2c| D4((D4))
  D3((D3)) -->|3a| E5((E5))
  D3((D3)) -->|3b| D7((D7))
  D4((D4)) -->|4a| D8((D8))
  D4((D4)) -->|4b| E6((E6))
  D5((D5)) -->|5a| E1((E1))
  D5((D5)) -->|5b| E3((E3))
  D5((D5)) -->|5c| E4((E4))
  D6((D6)) -->|6a| E7((E7))
  D6((D6)) -->|6b| E2((E2))
  D7((D7)) -->|7a| E1((E1))
  D7((D7)) -->|7b| E3((E3))
  D8((D8)) -->|8a| E1((E1))
  D8((D8)) -->|8b| E2((E2))`,
  paths: [
    "S0 -> 0a -> D1 -> 1b -> D2 -> 2c -> D4 -> 4a -> D8 -> 8a -> E1",
    "S0 -> 0a -> D1 -> 1b -> D2 -> 2a -> D5 -> 5c -> E4",
    "S0 -> 0a -> D1 -> 1a -> D3 -> 3b -> D7 -> 7b -> E3",
  ],
};