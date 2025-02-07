# Frontend - Aplicação de Manutenção de Equipamentos

<p align="center">
  <a href="https://reactjs.org/" target="_blank"><img src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" width="100" alt="React Logo" /></a>
</p>

## Descrição

Este repositório contém a **aplicação frontend** para o projeto de **Manutenção de Equipamentos**. Desenvolvida com o framework **React**, a aplicação oferece uma interface interativa e intuitiva para visualização, gestão e manutenção dos dados dos equipamentos e suas respectivas manutenções.

Além das funcionalidades principais de cadastro e gerenciamento de equipamentos e manutenções, a aplicação inclui um sistema de **autenticação de usuários**, garantindo acesso seguro às informações.

A aplicação integra-se com a **API RESTful** do backend, permitindo que os usuários interajam de forma eficiente com os dados, realizando operações como **visualizar**, **editar**, **excluir** e **adicionar novos equipamentos** e **manutenções**. 

Com isso, a plataforma facilita a organização e o acompanhamento das manutenções dos equipamentos, promovendo uma gestão mais eficiente e acessível.


## Funcionalidades

- **Tela de Login**: Realize o login para acessar o sistema.
- **Alteração de Dados do Usuário**: Os usuários podem visualizar e alterar seus próprios dados pessoais, como nome, e-mail e senha, diretamente através do sistema.
- **Pesquisa de Usuários**: É possível pesquisar por outros usuários cadastrados, permitindo encontrar rapidamente informações sobre outros membros do sistema.
- **Cadastro de Novos Usuários**: Usuários com permissão de **Administrador** podem cadastrar novos usuários, definindo seus dados e permissões no sistema. Isso permite uma gestão mais flexível e centralizada dos membros da plataforma.
- **Tela de Reset de Senha**: A aplicação possui uma funcionalidade de reset de senha. Caso o usuário tenha esquecido sua senha, ele pode solicitar um e-mail com um link de recuperação. Ao clicar no link, ele será redirecionado para uma página onde poderá criar uma nova senha para a sua conta.
- **Dashboard**: Exibe um painel com as principais informações sobre os equipamentos e manutenções.
- **Equipamentos**: Visualize a lista de equipamentos, crie novos equipamentos, edite ou exclua os existentes.
- **Manutenções**: Visualize, adicione, edite e exclua as manutenções para os equipamentos cadastrados.
- **Autenticação**: Login de usuários com validação de credenciais através de token JWT.
- **Filtros**: Filtros para pesquisa de usuários, equipamentos e manutenções por diversos parâmetros (como nome, setor, data, etc).

Essas funcionalidades tornam o sistema mais completo, oferecendo não apenas o gerenciamento de equipamentos e manutenções, mas também um robusto sistema de gerenciamento de usuários e controle de acesso.

## Como Rodar o Projeto

### 1. Clone este repositório:

```bash
git clone https://github.com/seu-usuario/manutencao-equipamentos-frontend.git
```

### 2. Instale as dependências:

```bash
cd manutencao-equipamentos-frontend
npm install
```

### 3. Inicie o servidor local:

```bash
npm start
```

### 4. Altere a porta do servidor local:

```bash
$env:PORT=3001
```
Com isso o frontend estará disponível em http://localhost:3001. A API também está rodando localmente e estará disponível em http://localhost:3000.

## Tecnologias Usadas

- **React**: Framework utilizado para o desenvolvimento do frontend.
- **React Router**: Para navegação entre as páginas da aplicação.
- **Axios**: Para consumir a API RESTful do backend.
- **Material-UI**: Para componentes de interface, como botões, tabelas e formulários.
- **JWT**: Para autenticação de usuários e manutenção de sessão.

## Como Funciona a Autenticação

A aplicação utiliza o **JWT (JSON Web Token)** para autenticação e autorização de usuários. Após o login, um token JWT é gerado e armazenado localmente (em **localStorage**), permitindo que o usuário acesse as páginas protegidas.

# Fluxo de Autenticação

1. O usuário faz login fornecendo suas credenciais (nome de usuário e senha).
2. O frontend envia uma requisição para o backend, que retorna um token JWT.
3. O token é armazenado no `localStorage` ou cookies para ser usado em requisições subsequentes.
4. O token é enviado no cabeçalho das requisições protegidas (como para adicionar ou editar equipamentos/manutenções).
5. Quando o token expira, o usuário precisa se autenticar novamente.

# Funcionalidades da Tela de Login

A tela de login permite que o usuário entre no sistema com suas credenciais. Caso o login seja bem-sucedido, o usuário será redirecionado para o painel principal (dashboard).

## Campos:
- **Usuário:** Campo para inserir o nome de usuário.
- **Senha:** Campo para inserir a senha.
- **Botão de Login:** Envia as credenciais para o backend e, em caso de sucesso, armazena o token JWT.
- **Redirecionamento:** Caso o login seja bem-sucedido, o usuário é redirecionado para a página principal do sistema.

# Funcionalidades da Tela de Dashboard

Este Dashboard é uma interface de gerenciamento que permite gerenciar usuários, equipamentos e manutenções de forma eficiente e intuitiva. Ele é construído com React e utiliza modais dinâmicos para adicionar, editar, excluir e consultar dados.

### 1. **Usuários**
O Dashboard oferece a capacidade de gerenciar usuários com as seguintes opções:

- **Cadastrar Usuário**: Permite cadastrar um novo usuário no sistema.
- **Consultar Usuários**: Exibe a lista de todos os usuários cadastrados.
- **Editar Usuário**: Permite editar as informações de um usuário existente.
- **Excluir Usuário**: Permite excluir um usuário do sistema.

### 2. **Equipamentos**
Além de gerenciar usuários, o Dashboard também permite gerenciar equipamentos com as opções:

- **Cadastrar Equipamento**: Permite registrar um novo equipamento no sistema.
- **Consultar Equipamentos**: Exibe a lista de equipamentos cadastrados.
- **Editar Equipamento**: Permite editar as informações de um equipamento.
- **Excluir Equipamento**: Permite excluir um equipamento do sistema.

### 3. **Manutenção**
O Dashboard também permite gerenciar a manutenção dos equipamentos com as seguintes funcionalidades:

- **Cadastrar Manutenção**: Registra uma nova manutenção para um equipamento.
- **Consultar Manutenções**: Exibe a lista de manutenções realizadas.
- **Editar Manutenção**: Permite editar os detalhes de uma manutenção registrada.
- **Excluir Manutenção**: Permite excluir um registro de manutenção.

### 4. **Gestão de Sessões**
O Dashboard inclui também um sistema de login, permitindo que o usuário se autentique e acesse as funcionalidades do painel com base em sua autorização.

- **Sair**: Permite ao usuário sair da sessão e retornar à página de login.

---

## Como usar

### 1. **Cadastro de Usuários**
1. Clique no botão **Usuários** no menu principal.
2. No submenu que aparecerá, selecione a opção **Cadastrar de Novo Usuário**.
3. Preencha as informações necessárias e clique em **Salvar** para registrar o novo usuário.

### 2. **Consultar Usuários**
1. Clique no botão **Usuários** no menu principal.
2. No submenu, selecione **Consultar Usuários**.
3. A lista de usuários cadastrados será exibida, onde você poderá visualizar as informações detalhadas de cada um.

### 3. **Editar Usuários**
1. Clique no botão **Usuários** no menu principal.
2. No submenu, selecione **Editar dados cadastrados**.
3. Escolha o usuário que deseja editar e faça as alterações necessárias.

### 4. **Excluir Usuários**
1. Clique no botão **Usuários** no menu principal.
2. No submenu, selecione **Excluir de Usuário**.
3. Escolha o usuário que deseja excluir e confirme a ação.

---

### 5. **Cadastro de Equipamentos**
1. Clique no botão **Equipamentos** no menu principal.
2. No submenu, selecione **Cadastro de Equipamentos**.
3. Preencha as informações necessárias e clique em **Salvar** para registrar o novo equipamento.

### 6. **Consultar Equipamentos**
1. Clique no botão **Equipamentos** no menu principal.
2. No submenu, selecione **Consulta Lista de Equipamentos**.
3. A lista de equipamentos cadastrados será exibida.

### 7. **Editar Equipamentos**
1. Clique no botão **Equipamentos** no menu principal.
2. No submenu, selecione **Edição de Equipamentos**.
3. Escolha o equipamento que deseja editar e faça as alterações necessárias.

### 8. **Excluir Equipamentos**
1. Clique no botão **Equipamentos** no menu principal.
2. No submenu, selecione **Exclusão de Equipamentos**.
3. Escolha o equipamento que deseja excluir e confirme a ação.

### 9. **Cadastro de Manutenção**
1. Clique no botão **Manutenção** no menu principal.
2. No submenu, selecione **Cadastro de Manutenção**.
3. Preencha as informações necessárias e clique em **Salvar** para registrar a manutenção.

### 10. **Consultar Manutenção**
1. Clique no botão **Manutenção** no menu principal.
2. No submenu, selecione **Consulta de Manutenção**.
3. A lista de manutenções realizadas será exibida.

### 11. **Editar Manutenção**
1. Clique no botão **Manutenção** no menu principal.
2. No submenu, selecione **Edição de Manutenção**.
3. Escolha a manutenção que deseja editar e faça as alterações necessárias.

### 12. **Excluir Manutenção**
1. Clique no botão **Manutenção** no menu principal.
2. No submenu, selecione **Exclusão de Manutenção**.
3. Escolha a manutenção que deseja excluir e confirme a ação.

---

## Estilo de UI

- O painel é construído com uma interface limpa e moderna.
- A navegação é intuitiva, com menus de fácil acesso e modais que guiam o usuário para a realização das ações.
- O estilo do painel é configurável via CSS, com imagens de fundo e transições suaves para uma experiência de usuário mais agradável.


# Funcionalidade: Recuperação de Senha

A funcionalidade de **Recuperação de Senha** permite que os usuários solicitem um link de recuperação para redefinir sua senha caso a tenham esquecido. A tela de recuperação de senha coleta o endereço de e-mail do usuário e envia uma solicitação para o backend, que deve enviar um e-mail com instruções para redefinir a senha.

## Como funciona

### Passo a Passo:

1. O usuário acessa a página de **Recuperação de Senha**.
2. A página solicita que o usuário insira seu **e-mail**.
3. O sistema verifica se o e-mail inserido é válido. Caso contrário, exibe um alerta informando que o e-mail precisa ser válido.
4. Se o e-mail for válido, uma solicitação é enviada ao backend para processar a recuperação de senha.
5. Se a solicitação for bem-sucedida, o usuário recebe uma notificação informando que um e-mail foi enviado. Caso contrário, um erro é exibido.
6. O usuário pode retornar à página de login clicando no link "Voltar para tela inicial".

### Componentes Principais

#### 1. **Campo de E-mail**
O usuário deve digitar o e-mail associado à conta para solicitar a recuperação da senha. A validação é feita para garantir que o e-mail tenha o formato correto.

#### 2. **Botão de Enviar**
O botão **Enviar e-mail** envia a solicitação de recuperação ao backend. Se o e-mail for válido, um processo de recuperação será iniciado.

#### 3. **Link para a Página de Login**
Se o usuário já lembra da senha ou deseja voltar à tela de login, há um link de navegação disponível para redirecioná-lo à página de login.


# Funcionalidade: Reset de Senha

A funcionalidade de **Reset de Senha** permite que os usuários criem uma nova senha para sua conta, após terem solicitado a recuperação da senha. O processo envolve o uso de um **token de recuperação** enviado para o e-mail do usuário, permitindo a redefinição da senha.

## Como Funciona

### Passo a Passo:

1. O usuário acessa a página de **Redefinição de Senha**, após clicar no link de recuperação enviado por e-mail.
2. A página solicita que o usuário insira uma **nova senha** e a **confirme**.
3. O sistema valida se as senhas coincidem e se a nova senha possui pelo menos 6 caracteres.
4. Se o token fornecido for válido, a senha será alterada no banco de dados.
5. Se a alteração for bem-sucedida, o usuário receberá uma mensagem de confirmação e será redirecionado para a tela de login após um contador regressivo.
6. Caso ocorra algum erro (token inválido, senha menor que 6 caracteres, etc.), uma mensagem de erro será exibida.

### Componentes Principais

#### 1. **Campos de Senha**
O usuário precisa inserir sua **nova senha** e **confirmar a nova senha** para garantir que ambas sejam iguais. A senha deve ter pelo menos 6 caracteres para ser aceita.

#### 2. **Botão de Reset**
O botão **Reset de Senha** envia a solicitação de alteração de senha para o backend. O botão será desabilitado após a conclusão bem-sucedida da redefinição.

#### 3. **Mensagens de Erro e Sucesso**
Mensagens de erro são exibidas se as senhas não coincidirem ou se a senha não atender aos critérios mínimos. Se a redefinição for bem-sucedida, uma mensagem de sucesso é exibida junto com um contador regressivo para redirecionamento à tela de login.



# Contribuições

Contribuições são muito bem-vindas! Se você deseja melhorar o projeto ou corrigir algum erro, siga as etapas abaixo para enviar seu código:

## Como Contribuir

1. **Faça um fork do repositório**
   - Clique no botão **Fork** no canto superior direito do repositório para criar uma cópia do projeto na sua conta.

2. **Clone o repositório forkado**
   - No seu terminal, clone o repositório para o seu ambiente local usando o comando:
     ```bash
     git clone https://github.com/seu-usuario/nome-do-repositorio.git
     ```

3. **Crie uma branch para a sua feature**
   - Crie uma nova branch para a funcionalidade ou correção que você deseja adicionar:
     ```bash
     git checkout -b feature/nome-da-feature
     ```

4. **Faça as alterações necessárias**
   - Implemente as mudanças ou adições desejadas. Certifique-se de seguir as convenções de estilo do projeto e manter a consistência do código.

5. **Commit suas alterações**
   - Após realizar as modificações, faça um commit com uma mensagem clara e descritiva sobre as mudanças feitas:
     ```bash
     git commit -am 'Adiciona nova feature: [nome da funcionalidade]'
     ```

6. **Push para o seu repositório**
   - Envie suas alterações para o repositório remoto:
     ```bash
     git push origin feature/nome-da-feature
     ```

7. **Abra um Pull Request**
   - No GitHub, abra um **Pull Request (PR)** comparando a sua branch com a `main` ou `develop` do repositório original.
   - Na descrição do PR, explique detalhadamente o que foi alterado e qualquer informação importante relacionada à funcionalidade ou correção.

## Boas Práticas

- **Mantenha o PR focado**: Evite enviar um PR com várias funcionalidades ou correções não relacionadas. Isso facilita a revisão.
- **Testes**: Se possível, adicione ou atualize testes para garantir que as mudanças não quebrem a funcionalidade existente.
- **Respeite o estilo de código**: Siga o estilo e a estrutura do código do repositório para manter a consistência.

## Revisão de Pull Requests

- Após a abertura do PR, nossa equipe irá revisar suas mudanças.
- Se necessário, será solicitado que você faça ajustes antes da aprovação.

Agradecemos sua contribuição! 🚀


# License

Este projeto está licenciado sob a MIT License - veja o arquivo LICENSE para mais detalhes.


