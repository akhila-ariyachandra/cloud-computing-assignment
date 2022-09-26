# cloud-computing-assignment

## Amazon Elastic Container Registry

```shell
aws ecr get-login-password | docker login --username AWS --password-stdin 842439686825.dkr.ecr.us-east-1.amazonaws.com
docker tag api-gateway 842439686825.dkr.ecr.us-east-1.amazonaws.com/api-gateway
docker push 842439686825.dkr.ecr.us-east-1.amazonaws.com/api-gateway
```
