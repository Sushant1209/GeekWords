# **GeekWords: My World of Words**

## **Project Overview**

<p align="center">
  <a href="https://www.youtube.com/watch?v=sTSZtdAkqwg">
    <img src="https://img.youtube.com/vi/sTSZtdAkqwg/0.jpg" alt="Video Demo">
  </a>
</p>

**GeekWord** is an innovative system designed to streamline the experience of accessing GeeksforGeeks articles. As a passionate writer and contributor to the GeeksforGeeks platform, I recognized the need for a more efficient way to share my articles with viewers. The existing process often involved cumbersome authentication prompts and hindered seamless access to valuable content.

In response, I embarked on the development of **GeekWord**, a comprehensive solution that not only simplifies article tracking but also enhances accessibility for readers. Leveraging a combination of cutting-edge technologies, I aimed to create a user-friendly experience that eliminates barriers and promotes knowledge sharing.

## **Data Flow Diagram**

<p align="center">
  <img src="Images/dataflow-diagram.png" alt="Data Flow Diagram">
</p>


## **Key Objectives**

1. **Automated Article Tracking:**
   - **GeekWord** automates the process of tracking my GeeksforGeeks articles. It continuously monitors updates, ensuring that readers have real-time access to my latest content.

2. **Authentication Prompt Resolution:**
   - One of the major pain points for viewers was encountering authentication prompts when accessing my profile link. **GeekWord** addresses this inconvenience by seamlessly handling authentication behind the scenes.

3. **Technology Stack:**
   - To achieve these objectives, I harnessed a powerful stack of technologies:
     - **Python:** The backbone of the system, Python enables efficient web scraping and data manipulation.
     - **Selenium:** Used for automated interaction with the GeeksforGeeks website, including login procedures.
     - **Azure Cosmos DB:** A central repository for storing article metadata and tracking changes, replacing Google Sheets and MongoDB Atlas for better performance.
     - **Spring Boot:** Designed a Spring Boot API to fetch data from MongoDB Atlas, hosted on Azure.
     - **HTML, CSS, and JavaScript:** These front-end technologies ensure a user-friendly interface.
     - **Azure:** The cloud platform for deployment and scalability.

## **Achievements**

1. **Seamless Access:**
   - By eliminating authentication prompts, **GeekWord** provides viewers with a seamless experience. They can now access my articles without unnecessary hurdles.

2. **Proficiency in Web Scraping and Data Management:**
   - Developing **GeekWord** required deep expertise in web scraping techniques. I mastered data extraction, parsing, and transformation to create a reliable article tracking system.

3. **Custom API Development:**
   - To enhance usability, I built a custom API within **GeekWord**. This API allows users to retrieve article data programmatically, whether for personal use or integration into other platforms.

4. **Improved Performance:**
   - By migrating from Google Sheets to MongoDB Atlas, and subsequently from MongoDB Atlas to Azure Cosmos DB, I significantly reduced the website’s load time from 10-15 seconds to a more acceptable range.

## **Conclusion**

**GeekWord** is more than a project; it's a commitment to knowledge dissemination. By leveraging technology, I've empowered readers, simplified their journey, and contributed to the GeeksforGeeks community. As I continue to refine and expand this system, I remain dedicated to breaking down barriers and making valuable content accessible to all.

