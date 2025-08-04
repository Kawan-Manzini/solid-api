# App

GymPass Style app.

# RFs Requisitos Funcinais

- [ ] Deve ser possivel se cadastrar;
- [ ] Deve ser possivel se autenticar;
- [ ] Deve ser possivel obter o perfil de um usuário logado;
- [ ] Deve ser possivel obter o numero de checkins realizados pelo usuário logado;
- [ ] Deve ser possivel o usuário obter seu histórico de checkins;
- [ ] Deve ser possivel o usuário buscar por academias proximas;
- [ ] Deve ser possivel o usuário buscar academias pelo nome;
- [ ] Deve ser possivel o usuário realizar checkin em uma academia;
- [ ] Deve ser possivel Validar o checkin de um usuário;
- [ ] Deve ser possivel Cadastrar uma academia;

# RNs Regra de Negocio

- [ ] O usuário nao deve poder se cadastrar com um e-mail duplicado;
- [ ] O usuário nao pode fazer 2 checkins no mesmo dia;
- [ ] O usuário nao pode fazer checkin se nao estiver a 100 metros da academia;
- [ ] O Checkin só pode ser validado ate 20min apos criado;
- [ ] O Checkin só pode ser validado por administradores;
- [ ] A Academia só pode ser cadastrada por administradores;

# RNFs Requisitos não-funcionais

- [ ] A senha do usuário precisa estar criptografada;
- [ ] Os dados da aplicaçao precisam estar persistidos em um banco PostgreSQL;
- [ ] Todas as listas de dados precisam estar paginadas com 20 itens por pagina;
- [ ] O usuário deve ser identificado por um JWT;

