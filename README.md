Project - https://github.com/GoldenkovVitali/rslang/projects/1
## Workflow:

1) Create an issue and **don't forget to point the project in issue settings** (skip this step if the issue is already created)
2) Pull changes from `develop`. Create a branch and work in there.

   **Naming for branches: feat/fix(#\<issue-number>)-<issue-name(shortened)>**

   Examples: 
   
   _feat(#1)-api-service_
   
   _fix(#1)-fix-incorrect-path_
3) You need to add commits with the following naming: 

   **Naming for commits: feat/fix(#\<issue-number>): \<commit message>**
 
   Example: 
   
   _feat(#1): initial structure_
   
   _fix(#1): remove unnecessary button_
4) After work is done you need to create a pull request to `develop` branch.

   Add a meaningful name and description (optionally add screenshots) and **don't forget to point the project in PR settings**

   Also, **don't forget to point the issue number (ex. #1) in PR description**

5) All PRs should be reviewed(and approved if everything is ok) by at least two team members. 

6) The final check and merging of PR should be performed by the curator ([uniorunr](https://github.com/uniorunr)). An issue should be closed after merging.

7) Then team-leader ([GoldenkovVitali]( https://github.com/GoldenkovVitali)) should perform testing of merged changes in `develop` branch. If something works incorrectly he should create new 'fix' issue.

   **Also, don't forget to move cards on the project board**
