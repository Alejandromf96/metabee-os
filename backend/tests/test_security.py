from app.core.security import (
    create_access_token,
    decode_access_token,
    hash_password,
    verify_password,
)


def test_hash_and_verify():
    hashed = hash_password("clave12345")
    assert hashed != "clave12345"
    assert verify_password("clave12345", hashed)
    assert not verify_password("otra_clave", hashed)


def test_verify_with_invalid_hash_returns_false():
    assert verify_password("clave12345", "no-es-un-hash") is False


def test_token_roundtrip_and_garbage():
    token = create_access_token("abc")
    assert decode_access_token(token) == "abc"
    assert decode_access_token("token.invalido.xyz") is None