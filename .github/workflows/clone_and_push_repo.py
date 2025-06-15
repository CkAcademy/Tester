import os
import requests
import subprocess

GITHUB_TOKEN = "GİZLİ_TOKENİNİZİ_BURAYA_YAZIN"
SOURCE_USER = "GitLatte"
SOURCE_REPO = "repos"
TARGET_USER = "CkAcademy"
TARGET_REPO = "repos-clone"  # Hedefte oluşacak yeni repo adı

def create_repo(token, user, repo_name):
    url = "https://api.github.com/user/repos"
    headers = {
        "Authorization": f"token {token}",
        "Accept": "application/vnd.github+json"
    }
    data = {
        "name": repo_name,
        "private": False,
        "description": f"Klon: {SOURCE_USER}/{SOURCE_REPO}"
    }
    response = requests.post(url, headers=headers, json=data)
    if response.status_code == 201:
        print(f"{repo_name} başarıyla oluşturuldu!")
        return True
    elif response.status_code == 422:
        print(f"{repo_name} zaten mevcut, devam ediliyor.")
        return True
    else:
        print("Repo oluşturulamadı:", response.json())
        return False

def clone_and_push():
    # Kaynak repo klonlanıyor
    clone_url = f"https://github.com/{SOURCE_USER}/{SOURCE_REPO}.git"
    subprocess.run(["git", "clone", "--mirror", clone_url], check=True)
    os.chdir(f"{SOURCE_REPO}.git")
    # Hedef repo url’si
    target_url = f"https://{GITHUB_TOKEN}@github.com/{TARGET_USER}/{TARGET_REPO}.git"
    # Remote’u değiştir
    subprocess.run(["git", "remote", "set-url", "--push", "origin", target_url], check=True)
    # Tüm branch ve tag’leri yeni repoya pushla
    subprocess.run(["git", "push", "--mirror"], check=True)
    os.chdir("..")
    print("Klonlama ve push işlemi tamamlandı.")

if __name__ == "__main__":
    if create_repo(GITHUB_TOKEN, TARGET_USER, TARGET_REPO):
        clone_and_push()
