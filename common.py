import logging
from logging import Logger

import pandas as pd
import paramiko


def charge_un_fichier_xml(chemin: str, xpath: str) -> pd.DataFrame:
    # https://pandas.pydata.org/docs/dev/whatsnew/v1.5.0.html#read-xml-now-supports-dtype-converters-and-parse-dates
    return pd.read_xml(chemin, xpath=xpath)


def configure_logger() -> Logger:
    return logging.getLogger("helios")


def télécharge_un_fichier():
    rsa_key = paramiko.RSAKey.from_private_key_file("~/.ssh/sftp_local")
    transport = paramiko.Transport((inventory[0], 8055))
    transport.connect(username="usr_finess_ls", pkey=rsa_key)
    sftp = paramiko.SFTPClient.from_transport(transport)
    print(sftp.listdir())


def main():
    télécharge_un_fichier()


if __name__ == "__main__":
    main()
