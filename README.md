## Inspiration
The **fragmentation** of _Electronic Health Records_ (EHRs) in modern clinical settings has created significant challenges in managing and leveraging health data effectively. Physicians are often confronted with vast amounts of unstructured data prior to consultations, leading to **cognitive overload**. They struggle to derive meaningful insights from this information and are forced to make decisions based on incomplete data within time constraints. Simultaneously, as the complexity of health information continues to grow, **patient literacy** is steadily declining, exacerbating the difficulty of navigating this data for both healthcare professionals and patients.

In response to these challenges, our team is developing a patient-friendly solution for managing health records. By parsing _medical documents_ and tracking daily _physiometric_ data, we aim to gain deeper insights into each patient's unique health journey. Our goal is to provide personalized advice that empowers patients to optimize their health and live their best lives—one tailored recommendation at a time.

## What it does
WellNest enables natural language interaction with the users' well-being data, leverages LLM to provide accessible, affordable, professional, and empathetic support to the users' well-being. In the WellNest experience, users can look up their data and ask for interpretation, explanation, and suggestions. 

In contrast to the legacy Apple Health interface with long lists of data items that are complex and difficult to understand, at WellNest, a chat box is all you need!

## How we built it
The well-being service is powered by the GPT-4o model via the OpenAI API with a structured context, incorporating summarized user health data and applying prompt engineering techniques.

To support scalability and future growth, cutting-edge technologies such as Nginx, Docker, and React Native are employed to develop web services following a microservice architecture. Each server, including Nginx itself, is containerized, so that expanded deployment can be accomplished easily utilizing cloud services. Besides that, the front-end constructed on React Native enables fast cross-platform development to serve an expanded user base. 


## Challenges we ran into
**Technical Constraints**
- Given the time frame of this competition, our MVP supports limited functionality, but showcases interesting future steps for growth.
- Raw health data from the iOS system is extremely redundant and lacks interpretability. We applied data processing techniques to formulate raw data into usable prompts with zero loss of effective information. 

**Budget Constraints**
- Instead of fully leveraging cloud services, we deployed our containers on a personal server. 
- Although React Native supports interfaces to native iOS functionalities, native development on the iOS system requires Xcode, which is beyond the resources of our front-end developers.

## Accomplishments that we're proud of
- Our concepts and ideas of an AI-powered health companion have been realized!
- We accomplished an entire full-stack development workflow in 36 hours!
- We utilized development tools and technologies that we had never used before!

## What we learned

## What's next for WellNest
- The user can not only read, but also update and change their health record through natural language interaction. Deeper system embedding of AI models is required, demanding further prompt engineering.
- Data visualization can be provided in chat boxes when it makes sense. 
- User interfaces and app control flow can be optimized. 

