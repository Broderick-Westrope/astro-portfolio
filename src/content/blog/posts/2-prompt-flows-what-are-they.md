---
title: "Prompt Flows - What Are They?"
description: "Prompt flows decompose complex LLM tasks into modular, single-responsibility nodes connected as directed acyclic graphs, enabling parallel execution, isolated debugging, and reusable components across systems. This architecture replaces monolithic prompts with maintainable pipelines where each node handles one classification or generation task using simple, testable prompts."
date: "2025-11-10"
draft: false
---

_Prerequisite Knowledge:_

- You do **not** need to have an understanding of any cloud services.
- You do need to have a high level understanding of what an LLM ([Large Language Model](https://www.youtube.com/watch?v=5sLYAQS9sWQ)) is, how you can have several instances of a single model, and what a system prompt is.
- It will also help to know what a DAG ([Directed Acyclic Graph](https://www.youtube.com/watch?v=1Yh5S-S6wsI)) is.

Since the launch of ChatGPT, as the AI craze has been washing over us, Microsoft has been launching AI features within Azure. Many of these live in what's currently called "Azure AI Foundry", a hub for AI tools that tries to be more user friendly than the traditional Azure Portal website.

Foundry, at it's core, is a wrapper around new and existing Azure offerings. It provides a suite of tools for working with LLMs in production-level ways. One of these tools is what's known as Prompt Flows. This is just the name Microsoft has given them; Amazon has called their equivalent Bedrock Flows. My goal is to help you understand what this service is by breaking it down into smaller components.

> ⚠️ **_NOTE:_**\
> I'll use "Prompt Flows" to talk about the Microsoft product and "prompt flows" (lowercase) to talk about the concept.

## An Example Scenario

To explore how prompt flows work we will use the following example:

> A company wants a system that can consume support requests then categorise by urgency and department, and give a preliminary response that includes links to FAQs that may be relevant. The system should output the response it drafted as well as what department was chosen.

This problem can be broken down into four distinct tasks:

1. Classify by urgency
2. Classify by department
3. Retrieve relevant FAQs
4. Draft a response

## Within Each Node

A prompt flow is a graph (aka. network) of nodes, each of which does the following:

1. Take some input parameters.
2. Construct a system prompt dynamically, using the input parameters from step 1.
3. Query an LLM using the system prompt from step 2.
4. Store the output of step 3 in memory for later use.

We broke our example scenario down into four tasks. These tasks are a logical starting point for figuring out what our nodes are. It's not a strict rule, but a good place to start.

### 1. Taking Inputs

The input parameters of a node could either be provided by the user when the prompt flow is called or retrieved from the output of other nodes.

In our scenario, the text of the support request is a user-entered input. Whereas, the output from "Retrieve relevant FAQs" is an _input_ of "Draft response" since it also needs to know what FAQs were chosen.

### 2. Constructing a System Prompt

The system prompt leverages what's known as a templating language. Simply put, this is a piece of text that allows you to insert other text later on. For our node "Classify by urgency", this allows us to create a system prompt and insert the text of the user's support request. It may look like this:

```
The user has submitted the following ticket:
{{ticket_text}}

Classify the ticket's urgency into either high, medium, or low. Output only the urgency level. Do not format the strings, add a sentence, or change the chosen word in any other way.
```

Any inputs can be inserted in this way, which as we've seen already means we can insert the output of other nodes into our system prompt.

> ⚠️ **_NOTE:_**\
> This post uses the Go templating language, but any can be used. For example, Azure Prompt Flows uses the Jinja2 language.

### 3. Query an LLM

Just as you would send a message to ChatGPT asking whether pineapple belongs on pizza, you can send system prompts created using templating. Since the result of a templated system prompt is just text, it can be sent like any other message to your LLM of choice.

> 💡 **_TIP:_**\
> [GitHub Playground](https://github.com/marketplace/models/azure-openai/gpt-4o-mini/playground) is a great place to test system prompts and even lets you query models via an API for **_free_**. It's not for production use, but is perfect for finding the right model and using during development.

### 4. Store the Output

As a user of prompt flows, nothing needs to be done here. If you were to implement a prompt flow engine (foreshadowing a future post? maybe...) then you would need to store the response from the LLM in-memory, perhaps using a map but that's beyond scope of this post.

## The Graph as a Whole

Great! Now you know what a node does. You could of course have a prompt flow with no graph, by having only a single node that takes input from and gives output to the caller (but this is not where prompt flows shine). The graph prompt flow is formed by chaining nodes together where the inputs of a node are the outputs of one or more nodes.

The type of graph is a directed acyclic graph (DAG), meaning the paths between nodes are one-way and when traversing the graph you can never see the same node twice (ie. no way to end up at the same node twice). This makes sense when we consider what each node contains; we wouldn't want to end up in an endless loop or not know which node needs to be called first (to use as an input for another).

If we built the system from our example scenario without using a prompt flow we would need to make one bigger prompt containing all the responsibilities to complete each task. This is far more likely to cause issues, and only gets worse as the system grows in complexity:

- The single model must juggle four distinct cognitive tasks simultaneously.
- Output parsing becomes complex. In our example scenario, we would need some way to reliably distinguish the drafted response from the chosen department.
- Changing one task requires rewriting the entire prompt, which may effect the other tasks in ways that weren't anticipated.
- Reusing one task in another system is more tedious since there's no clear separation.

Instead, we can build a prompt flow that fulfils the requirements of this system and avoids these issues. This diagram helps visualise how the nodes connect, and the descriptions following it will contain a deeper look into each node that explains _why_ the diagram looks like this.

![Alt text](2-img-1.png "Optional Title")
The circles at the top and bottom are the start and end of the flow, respectively.

### Node 1: Classify by Urgency

**Input:**

- `ticket_text` - This comes from the user's input into the ticket creation system, which is beyond the scope of this article.

**Prompt:**

```
The user has submitted the following ticket:
{{ticket_text}}

Classify the ticket's urgency into either high, medium, or low. Output only the urgency level. Do not format the strings, add a sentence, or change the chosen word in any other way.
```

**Output:**

- `urgency_level` - This is a string that matches "high", "medium", or "low" exactly.

### Node 2: Classify by Department

**Input:**

- `ticket_text` - The same input as Node 1.

**Prompt:**

```
The user has submitted the following ticket:
{{ticket_text}}

Classify the ticket by department into either billing, engineering, or sales. Output only the department. Do not format the strings, add a sentence, or change the chosen word in any other way.
```

**Output:**

- `department` - This is a string that matches "billing", "engineering", or "sales" exactly.

### Node 3: Retrieve FAQs

**Input:**

- `ticket_text` - The same input as Node 1 and Node 2.
- `department` - The output from Node 2.

**Prompt:**

```
The user has submitted the following ticket:
{{ticket_text}}

Extract up to 3 FAQs (both question and response) from the knowledge base of department {{department}} which are relevant to the user's ticket. If there are no tickets that are relevant to the user's ticket then return none.
```

**Output:**

- `faqs` - The prompt above is far more simple than would be used in production systems. Depending on the prompt this output variable could be a JSON list of objects, each containing a question and answer. Or, your knowledge base may not have answers and instead links to relevant web pages.

> ⚠️ **_NOTE:_**
> This node does not actually _retrieve_ FAQs since it does not have access to any. In a real-world system we could either provide it with this data via RAG, an MCP server that gives access to a database, or some other method. For the sake of this article, it's fine that this node will hallucinate the FAQs from it's training data.

### Node 4: Draft a Response

**Input:**

- `ticket_text` - The same as the other nodes.
- `urgency_level` - The output from Node 1.
- `department` - The output from Node 2.
- `faqs` - The output from Node 3

**Prompt:**

```
Draft a professional response to this support ticket.

Ticket urgency: {{.urgency_level}}
Department: {{.department}}

Ticket content:
{{.ticket_text}}

Relevant FAQs:
{{.faqs}}

Your response should:
1. Acknowledge the ticket
2. Address the urgency appropriately
3. Reference relevant FAQs if applicable
4. Be professional and helpful
5. Route to the appropriate department if needed
```

**Output:**

- `response` - This is the final response that will be given to the consumer of the prompt flow. This could be the ticket creator, a human who will proof read it, or another AI to add some finishing touches.

### Review

This is a lot to take in. As you look at each node definition, recall the following:

- Inputs can come from the user/caller of the prompt flow _OR_ from other nodes.
- The inputs are inserted by their name into the prompt, meaning if we have an input `urgency_level = "low"` then `{{.urgency_level}}` will be replaced by `low`.
- The output is stored in memory for use by later nodes, or in the case of Node 4, to be returned to the caller.

## Why Use Prompt Flows?

Prompt flows decompose complex LLM tasks into discrete, single-responsibility nodes. This architecture delivers several concrete advantages:

### Modularity

Each node performs one task. In our example, you can modify Node 2's department logic without touching urgency classification or FAQ retrieval. You can drop Node 3 entirely if FAQ lookup becomes unnecessary.

### Reusability

Node 1's urgency classifier can be exported to other ticket systems, chat routing, or escalation pipelines. It's a very simple example, but in real-world systems the reusable components will become clear. This way only one instance of the logic needs to be tested and maintained.

### Parallelisation

Nodes 1 and 2 have no dependencies on each other since both consume only the caller input. They can execute concurrently, halving latency compared to sequential execution. Note, this will only happen if the prompt flow engine is written in a language and structure which allows for this.

### Debugging

When the final response degrades, you can inspect each node's output independently. If `department` returns garbage, the issue is isolated to Node 2. You don't need to sift through a monolithic prompt wondering which instruction failed, which is made much harder by the pseudo-random behaviour of LLMs.

### Prompt Simplicity

In our example, each node's prompt is just a few lines. Real-world scenarios will demand more complex prompts, whether you're using prompt flows or not, but prompt flows inherently allow prompts to be smaller and more focussed. This allows the people reading them to reason about it more easily and not have to context switch.

## Conclusion

Prompt flows are DAGs executed by a runtime that:

1. Resolves node dependencies.
2. Executes nodes with satisfied dependencies (potentially in parallel).
3. Passes outputs as inputs to downstream nodes.
4. Returns final node outputs to the caller.

To get started using prompt flows you could use tools like Azure AI Foundry which contains their Prompt Flows feature or AWS Bedrock Flows. Since prompt flows are made of simple foundations it is also reasonable to build a prompt flow engine.

This is exactly what I'm trying to do [here](https://github.com/Broderick-Westrope/prompt-flow): build an open-source prompt flow engine that doesn't lock you into a single cloud provider, lets you source control your prompts, and provides tools to do advanced things. Imagine having nodes that call other prompt flows, databases, or external APIs which your downstream nodes can use as input. Or perhaps you want a prompt flow that executes branches of the graph only if the output of an upstream node meets some criteria. The limits are up to us, and I'd love to hear [your ideas](https://github.com/Broderick-Westrope/prompt-flow/issues/new).
