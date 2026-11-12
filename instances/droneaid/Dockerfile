ARG VIVA_TAG=alpine
FROM registry.vivalence.org/beef/viva/vivalence/runtime:${VIVA_TAG}

ADD https://api.github.com/repos/vivalence/registry-assembly/commits/HEAD /tmp/heads/assembly.json
ADD https://api.github.com/repos/vivalence/registry-droneaid/commits/HEAD /tmp/heads/droneaid.json
RUN viva registry/tap https://github.com/vivalence/registry-assembly \
 && viva registry/tap https://github.com/vivalence/registry-droneaid \
 && viva registry/doctor

ENV VIVA_INSTANCE_MOUNT=/viva/instance
