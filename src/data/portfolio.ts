export const profile = {
  name:'Devanshi Pandey',
  role:'Data Analyst | Program & Operations',
  tagline:'Turning data, systems, and ideas into decisions that move things forward.',
  summary:'Computer Science undergraduate skilled in data analytics, ETL pipelines, Power BI, and SQL. Passionate about transforming data into actionable insights through analytical thinking and process optimization.',
  github:'https://github.com/Devzz2302',
  linkedin:'https://www.linkedin.com/in/devanshi-pandey-47425a24a/',
  email:'devanshii2304@gmail.com',
  phone:'+91 9761190666'
}

export const experience = [
  {company:'Bennett University — Placement Cell', role:'Data Analytics Intern', period:'Jan – Mar 2026', bullets:['Built automated ETL pipelines and Power BI dashboards tracking recruitment KPIs, consolidating placement data into a single source of truth and eliminating manual reporting effort.','Ran exploratory analysis to surface hiring trends and inform data-driven decisions, presenting insights to the placement team.']},
  {company:'Bennett University — Placement Cell', role:'Program & Operations Member', period:'2025 – 2026', bullets:['Coordinated placement drives and recruitment operations across students, recruiters, and staff, improving process efficiency and student engagement.']},
  {company:'ChainShift', role:'Frontend Engineer', period:'Sep 2025', bullets:['Delivered responsive React UI components and resolved API edge cases affecting live production data shipping under real deadlines.']}
]

export const featuredProjects = [
  {title:'Automated Car Damage Detection', year:'2026', tech:['Python','PyTorch','YOLOv8','OpenCV','Gradio','Docker'], description:'Two-stage vehicle inspection system that classifies damaged vs. intact vehicles, localizes six damage categories, and produces an explainable digital inspection score.', detail:'Fine-tuned object detection, threshold validation on unseen data, repair-cost bands, uncertain-prediction routing, and a Dockerized Gradio interface.', github:'https://github.com/Devzz2302/Automated-Car-Damage-Detection-', featured:true},
  {title:'Visual Product Retrieval System', year:'2026', tech:['Python','PyTorch','ResNet50','Scikit-learn','Streamlit'], description:'Content-based image retrieval engine using 2048-dimensional ResNet50 embeddings across 2,000+ fashion product images.', detail:'Built a searchable visual index and KNN cosine-similarity retrieval pipeline for sub-second top-5 product recommendations, deployed through Streamlit.', github:'https://github.com/Devzz2302/Visual_Product_Retrieval_System', featured:true},
  {title:'ResumeIQ AI', year:'2026', tech:['Flask','React','TypeScript','Scikit-learn','NLP','REST APIs'], description:'NLP-based resume parsing and candidate classification platform for automated screening and job-role prediction.', detail:'Includes ATS scoring, skill-gap analysis, resume insights, candidate analytics, reusable React components, and Flask APIs for document processing.', github:'https://github.com/Devzz2302/ResumeIQ-AI', featured:true}
]

export const skills = {
  'Analytics & BI':['Power BI','Tableau','Excel','KPI Dashboards','Data Visualization','EDA','Statistical Analysis','Predictive Analytics'],
  'Data & Programming':['Python','SQL','Pandas','NumPy','ETL & Data Pipelines','Machine Learning'],
  'Problem Solving':['Structured Thinking','Quantitative Reasoning','Business Problem-Solving','Data-Driven Decisions'],
  'Operations':['Program Coordination','Stakeholder Management','Reporting','Documentation','Process Improvement'],
  'CS Foundations':['Data Structures & Algorithms','OOP','DBMS'],
  'Tools':['Git','GitHub','VS Code']
}
