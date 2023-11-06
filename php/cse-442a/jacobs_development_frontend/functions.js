function login_form() {
    const head = document.createElement("h1");
    head.innerHTML = "DEMO LOGIN FORM";
    document.body.appendChild(head);


    form = document.createElement('form');
    form.method="POST";
    form.action='../auth/validate_login';
    
    input_u = document.createElement('input');
    input_u.name = 'username';
    input_u.type = 'text';
    input_u.placeholder = 'enter username';

    input_p = document.createElement('input');
    input_p.name = 'password';
    input_p.type = 'password';
    input_p.placeholder = 'enter password';

    input_s = document.createElement('input');
    input_s.value = 'login';
    input_s.type = 'submit';

    br = document.createElement('br');

    form.appendChild(input_u);
    form.append(br);
    form.appendChild(input_p);
    form.append(br);
    form.appendChild(input_s);

    document.body.append(form);
}