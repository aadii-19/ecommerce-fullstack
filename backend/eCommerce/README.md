# 🔐 Environment Setup (JWT Secret)

This project uses JWT authentication.
You **must set an environment variable** for the secret key before running the backend.

---

## 🖥️ Windows (PowerShell)

Run this command:

```powershell
setx JWT_SECRET "yourSuperSecretKey1234567890"
```

Then **restart your IDE (IntelliJ) or terminal**.

To verify:

```powershell
echo $env:JWT_SECRET
```

---

## 🖥️ Windows (CMD)

```cmd
setx JWT_SECRET "yourSuperSecretKey1234567890"
echo %JWT_SECRET%
```

---

## 🐧 Mac/Linux

```bash
export JWT_SECRET=yourSuperSecretKey1234567890
```

To verify:

```bash
echo $JWT_SECRET
```

---

## ⚠️ Important Notes

* The secret key must be **at least 32 characters long**
* Do NOT commit your secret key to GitHub
* Restart your IDE after setting the variable
* This value is used in `application.properties`:

```properties
jwt.secret=${JWT_SECRET}
```

---

## ❌ Common Issues

* Token not generating → check if env variable is set
* `${JWT_SECRET}` not resolving → restart IDE
* Wrong command in PowerShell vs CMD

---

## ✅ Example Secret

```text
thisIsMySuperSecretKeyForJWTAuth123456
```
