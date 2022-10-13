# App nghe nhạc
## Công nghệ dự kiến sử dụng:
  + Front-end: [ReactJS](https://reactjs.org/), [SCSS](https://sass-lang.com/), [Chakra UI](https://chakra-ui.com/), [React Hook Form](https://react-hook-form.com/)
  + Back-end: [Go Lang](https://go.dev/)([Gin Gonic](https://gin-gonic.com/)), [GORM](https://gorm.io/)
  + Database: MySQL
## Database Design
  <a href="https://app.quickdatabasediagrams.com/#/d/sxtRMq">Datagram</a>
## GIT
  Mỗi người sẽ code trên một nhánh (branch), khi push sẽ push lên nhánh đó rồi mới merge vào nhánh chính (master), nếu muốn cập nhật sự thay đổi trên nhánh chính về nhánh của mình thì sẽ pull code từ nhánh chính (master) về.
 ```bash
  # Tạo branch mới
  git branch <branch-name>
  # Chuyển sang branch mới tạo
  git checkout <branch-name>
  # Push branch mới tạo lên trên github
  git push --set-upstream origin <branch-name>
  # Pull code từ master về branch
  git pull origin master
 ```
